import * as k8sClient from '@kubernetes/client-node';
import { APIObject } from '../../base/APIResource.js';
import { getLogger } from '../../Logger.js';

import { 
    KubernetesLifecycleEvent,
    KubernetesLifecycleEventPayload,
    PostCreateEventPayload,
    PostDeleteEventPayload,
    PostPatchEventPayload,
    PostWaitEventPayload,
    PreCreateEventPayload,
    PreDeleteEventPayload,
    PrePatchEventPayload,
    PreWaitEventPayload,
    WaitResult,
} from './KubernetesLifecycleEvent.js';
import { APIResourceFactory, Application, k8s, ResourceWaiter } from '../../index.js';
import * as jsonmergepatch from 'json-merge-patch';
import { WAITERS } from './waiters/index.js';
import { APIClient, KubernetesAPIClient } from './APIClient.js';

export type EventListenerFunction = (eventData: KubernetesLifecycleEventPayload) => Promise<void>;

export interface KubernetesExportOptions {
    releaseName: string;
    numberOfReleasesToKeep?: number;
    namespace: string;
    dryRun?: boolean;
    claimOwnership?: boolean;
    waitTimeoutSeconds?: number;
    waitIntervalSeconds?: number;
    resourceWaitTimeouts?: Map<string, number>;
    eventListeners?: Map<string, EventListenerFunction[]>;
    releaseMetadata?: Record<string, string>;
    apiClient?: APIClient;
}

interface State {
    name: string;
    resources: APIObject[];
    metadata: Record<string, string>;
}

interface ResourceSyncResult {
    previousState?: APIObject;
    desiredState: APIObject;
    newState: APIObject;
}

const DEFAULT_EXPORT_OPTIONS: Partial<KubernetesExportOptions> = {
    claimOwnership: false,
    dryRun: false,
    waitTimeoutSeconds: 300,
    waitIntervalSeconds: 10,
    numberOfReleasesToKeep: 5,
    resourceWaitTimeouts: new Map<string, number>(),
    eventListeners: new Map<string, EventListenerFunction[]>(),
    releaseMetadata: {},
};

const MANAGED_BY_LABEL = 'app.kubernetes.io/managed-by';
const RELEASE_NAME_LABEL = 'app.kubeframe/release-name';
const RELEASE_STATE_LABEL = 'app.kubeframe/release-state';
const STATE_KEY = 'kubeframe-state';

const MANAGED_BY = 'kubeframe';
const FIELD_MANAGER = 'kubeframe';

const SECONDS_IN_MILLIS = 1000;

export class KubernetesExporter {

    private logger = getLogger().child({ component: KubernetesExporter.name });
    private apiClient: APIClient;
    private options: KubernetesExportOptions;
    private waiterTypes: Map<string, ResourceWaiter> = new Map();
    private eventListeners: Map<string, EventListenerFunction[]> = new Map();

    constructor(options: KubernetesExportOptions) {
        this.options = { ...DEFAULT_EXPORT_OPTIONS, ...options };
        this.apiClient = this.options.apiClient || new KubernetesAPIClient(FIELD_MANAGER);
        // Register default waiters
        for (const waiter of WAITERS) {
            this.waiterTypes.set(waiter.getResourceType(), waiter);
        }
    }

    registerResourceWaiter(resourceType: string, waiter: ResourceWaiter) {
        this.waiterTypes.set(resourceType, waiter);
    }

    addEventListener(eventType: string, listener: EventListenerFunction) {
        const listeners = this.eventListeners.get(eventType) || [];
        listeners.push(listener);
        this.eventListeners.set(eventType, listeners);
    }

    async notifyEventListeners(eventType: string, eventData: KubernetesLifecycleEventPayload): Promise<void> {
        const listeners = this.eventListeners.get(eventType) || [];
        for (const listener of listeners) {
            await listener(eventData);
        }
    }

    async export(application: Application) {

        const state = await this.getState();

        if (state) {
            this.logger.info(`Found existing state for release: ${this.options.releaseName}`);
        } else {
            this.logger.info(`No existing state found for release: ${this.options.releaseName}`);
        }

        application.setNamespace(this.options.namespace);

        const desiredResources = application.getSortedResources();
        const clusterResources = await this.fetchClusterResources(desiredResources);

        // Fetch cluster resources corresponding to desired resources
        for (const [identifier, resource] of clusterResources.entries()) {
            if (resource) {
                if (!this.isResourceManaged(resource)) {
                    if (this.options.claimOwnership) {
                        this.logger.info(`Claiming ownership of resource: ${identifier}`);
                    } else {
                        throw new Error(`Resource ${identifier} is not managed by Kubeframe release ${this.options.releaseName}`);
                    }
                }
            }
        }

        // Resources that are no longer in list of desired resources
        const staleResources = this.detectStaleResources(desiredResources, state?.resources || []);

        const syncedResources: ResourceSyncResult[] = [];
        let exportFailed = false;

        // Start exporting desired resources
        for (const resource of desiredResources) {
            const existingResource = clusterResources.get(resource.getIdentifier());
            try {
                // Even if the resource is not in cluster it does not mean it was not created in the previous state
                // someone might have deleted it manually
                const previousState = state?.resources
                    ?.find(stateResource => stateResource.getIdentifier() === resource.getIdentifier());
                
                if (existingResource) {
                    const patchedResource = await this.patchResource(resource, existingResource);
                    syncedResources.push({
                        previousState,
                        desiredState: resource,
                        newState: patchedResource,
                    });
                } else {
                    const createdResource = await this.createResource(resource);
                    syncedResources.push({
                        previousState,
                        desiredState: resource,
                        newState: createdResource,
                    });
                }
            } catch (error) {
                this.logger.error(`Failed to sync resource: ${resource.getIdentifier()}`);
                exportFailed = true;
                break;
            }
        }

        if (exportFailed) {
            // Rollback the change
            for (const syncedResource of syncedResources.reverse()) {
                if (syncedResource.desiredState.isRollbackAllowed()) {
                    if (syncedResource.previousState) {
                        await this.patchResource(syncedResource.previousState, syncedResource.newState);
                    } else {
                        await this.deleteResource(syncedResource.desiredState);
                    }
                } else {
                    this.logger.info(`Skipping rollback of resource: ${syncedResource.desiredState.getIdentifier()} as rollback is not allowed`);
                    continue;
                }
            }
        } else {
            // Delete stale resources in reverse order of creation
            for (const staleResource of staleResources.reverse()) {
                try {
                    
                    const existingResource = await this.getExistingResource(staleResource);

                    if (!existingResource) {
                        this.logger.info(`Skipping deletion of stale resource: ${staleResource.getIdentifier()} as it does not exist in cluster`);
                        continue;
                    }
                    
                    if (!this.isResourceManaged(existingResource)) {
                        this.logger.info(`Skipping deletion of stale resource: ${staleResource.getIdentifier()} as it is not managed by Kubeframe release ${this.options.releaseName}`);
                        continue;
                    }

                    await this.deleteResource(staleResource);
                } catch (error) {
                    this.logger.error(`Failed to delete stale resource: ${staleResource.getIdentifier()}`);
                }
            }

            const newState = JSON.stringify({
                resources: desiredResources.map(resource => resource),
                metadata: this.options.releaseMetadata,
            }, null, 2);

            await this.storeState(newState);
        }
    }

    private isResourceManaged(resource: k8sClient.KubernetesObject): boolean {
        return resource?.metadata?.labels?.[MANAGED_BY_LABEL] === MANAGED_BY &&
            resource?.metadata?.labels?.[RELEASE_NAME_LABEL] === this.options.releaseName;
    }

    async rollback() {

        this.logger.info(`Rolling back release: ${this.options.releaseName}`);

        const currentState = await this.getState();

        if (!currentState) {
            this.logger.info(`No current state found for release: ${this.options.releaseName}, skipping rollback`);
            return;
        }

        // Get the previous state
        const previousState = await this.getState(1);

        if (!previousState) {
            this.logger.info(`No previous state found for release: ${this.options.releaseName}, skipping rollback`);
            return;
        }

        const currentResources = currentState.resources;
        const desiredResources = previousState.resources;
        const clusterResources = await this.fetchClusterResources(currentResources);

        for (const [identifier, resource] of clusterResources.entries()) {
            if (resource) {
                if (!this.isResourceManaged(resource)) {
                    if (this.options.claimOwnership) {
                        this.logger.info(`Claiming ownership of resource: ${identifier}`);
                    } else {
                        this.logger.info(`Skipping rollback of resource: ${identifier} as it is not managed by Kubeframe release ${this.options.releaseName}`);
                        throw new Error(`Resource ${identifier} is not managed by Kubeframe release ${this.options.releaseName}`);
                    }
                }
            }
        }

        for (const resource of desiredResources) {
            const existingResource = clusterResources.get(resource.getIdentifier());
            if (existingResource) {
                if (resource.isRollbackAllowed()) {
                    await this.patchResource(resource, existingResource);
                } else {
                    this.logger.info(`Skipping rollback of resource: ${resource.getIdentifier()} as rollback is not allowed`);
                    continue;
                }
            } else {
                await this.createResource(resource);
            }
        }

        const staleResources = this.detectStaleResources(desiredResources, currentState.resources);

        for (const resource of staleResources.reverse()) {
            if (resource.isRollbackAllowed()) {
                await this.deleteResource(resource);
            } else {
                this.logger.info(`Skipping deletion of stale resource: ${resource.getIdentifier()} as rollback is not allowed`);
                continue;
            }
        }

        await this.deleteState(currentState.name);
    }

    async destroy() {
        
        const state = await this.getState();

        if (state && state.resources.length > 0) {
            this.logger.info(`Found existing state for release: ${this.options.releaseName}`);
        } else {
            this.logger.info(`No existing state found for release: ${this.options.releaseName}`);
            return;
        }

        for (const resource of state.resources) {
            const existingResource = await this.getExistingResource(resource);
            if (existingResource) {
                if (!this.isResourceManaged(existingResource)) {
                    this.logger.info(`Skipping deletion of resource: ${resource.getIdentifier()} as it is not managed by Kubeframe release ${this.options.releaseName}`);
                    continue;
                }
                await this.deleteResource(resource);
            } else {
                this.logger.info(`Skipping deletion of resource: ${resource.getIdentifier()} as it does not exist in cluster`);
            }
        }

        await this.cleanupReleases(0);
    }

    private async fetchClusterResources(resources: APIObject[]): Promise<Map<string, APIObject>> {
        
        const clusterResources = new Map<string, APIObject>();

        for (const resource of resources) {
            const existingResource = await this.getExistingResource(resource);
            if (existingResource) {
                clusterResources.set(resource.getIdentifier(), existingResource);
            } else {
                clusterResources.set(resource.getIdentifier(), null);
            }
        }

        return clusterResources;
    }

    private detectStaleResources(
        desiredResources: APIObject[],
        currentResources: APIObject[],
    ): APIObject[] {
        const staleResources: APIObject[] = [];
        for (const currentResource of currentResources) {
            if (!desiredResources.some(desiredResource => desiredResource.getIdentifier() === currentResource.getIdentifier())) {
                staleResources.push(currentResource);
            }
        }
        return staleResources;
    }

    private generateNewStateConfigMapName(releaseName: string): string {
        const timestamp = Date.now();
        return `${releaseName}-kubeframe-state-${timestamp}`;
    }

    private async storeState(newState: string) {
        const configMapName = this.generateNewStateConfigMapName(this.options.releaseName);

        const configMap = new k8s.core.v1.ConfigMap({
            metadata: {
                name: configMapName,
                namespace: this.options.namespace,
                labels: {
                    [MANAGED_BY_LABEL]: MANAGED_BY,
                    [RELEASE_NAME_LABEL]: this.options.releaseName,
                    [RELEASE_STATE_LABEL]: 'true',
                },
            },
            data: {
                [STATE_KEY]: newState,
                ...(this.options.releaseMetadata || {}),
            },
        });


        if (!this.options.dryRun) {
            try {
                this.logger.info(`Storing new state ConfigMap: ${configMapName} for release: ${this.options.releaseName}`);
                await this.apiClient.create(configMap);
                this.logger.info(`Successfully stored new state ConfigMap: ${configMapName}`);
            } catch (error) {
                this.logger.error(`Failed to store new state ConfigMap: ${configMapName} for release: ${this.options.releaseName}`);
                throw error;
            }
        } else {
            this.logger.info(`[DRY RUN] Would have stored new state ConfigMap: ${configMapName} for release: ${this.options.releaseName}`);
        }

        await this.cleanupReleases(this.options.numberOfReleasesToKeep);
    }

    private async getState(offset: number = 0): Promise<State | null> {

        const labelSelector = this.createLabelSelector({
            [MANAGED_BY_LABEL]: MANAGED_BY, 
            [RELEASE_NAME_LABEL]: this.options.releaseName,
            [RELEASE_STATE_LABEL]: 'true',
        });

        try {
            this.logger.info(`Fetching existing state ConfigMap for release: ${this.options.releaseName}`);
            const configMaps = await this.apiClient.list(
                'v1',
                'ConfigMap',
                this.options.namespace,
                labelSelector,
            );

            if (!k8s.core.v1.ConfigMapList.is(configMaps)) {
                throw new Error('Invalid response from API client');
            }

            configMaps.items.sort(sortByCreationTimestamp);

            if (configMaps.items.length > offset) {
                const latestConfigMap = configMaps.items[offset];
                const stateData = latestConfigMap.data ? latestConfigMap.data[STATE_KEY] : null;
                this.logger.info(`Successfully fetched existing state ConfigMap: ${latestConfigMap.metadata?.name} for release: ${this.options.releaseName}`);
                
                let parsedState = undefined;

                try {
                    parsedState = JSON.parse(stateData || '{resources: []}');
                } catch (error) {
                    this.logger.error(`Failed to parse state data: ${stateData}`);
                    throw error;
                }

                const resources = parsedState.resources.map((resource: any) => {
                    return APIResourceFactory.createFromPlainJSON(resource);
                });

                const metadata = {};
                for (const key of Object.keys(latestConfigMap.data).filter((key: string) => key !== STATE_KEY)) {
                    metadata[key] = latestConfigMap.data[key];
                }

                return {
                    name: latestConfigMap.metadata?.name,
                    resources,
                    metadata,
                };
            }

            this.logger.info(`No existing state ConfigMap found for release: ${this.options.releaseName}`);

        } catch (error) {
            this.logger.error(`Failed to fetch existing state ConfigMap for release: ${this.options.releaseName}`);
        }

        return null;
    }

    private async cleanupReleases(keep: number) {

        this.logger.info(`Cleaning up old releases for release: ${this.options.releaseName}`);
        
        const labelSelector = this.createLabelSelector({
            [MANAGED_BY_LABEL]: MANAGED_BY, 
            [RELEASE_NAME_LABEL]: this.options.releaseName,
            [RELEASE_STATE_LABEL]: 'true',
        });

        const configMapList = await this.apiClient.list(
            'v1',
            'ConfigMap',
            this.options.namespace,
            labelSelector,
        );

        if (!k8s.core.v1.ConfigMapList.is(configMapList)) {
            throw new Error('Invalid response from API client');
        }

        configMapList.items.sort(sortByCreationTimestamp);

        const releasesToDelete = configMapList.items.slice(keep);

        const deletedReleases = [];
        for (const configMap of releasesToDelete) {
            try {
                await this.deleteState(configMap.getName());
                deletedReleases.push(configMap.getName());
            } catch (error) {
                this.logger.error(`Failed to delete old release: ${configMap.getName()}`);
            }
        }
        if (this.options.dryRun) {
            this.logger.info(`[DRY RUN] Would have cleaned up old releases: ${deletedReleases.join(', ')}`);
        } else {
            this.logger.info(`Successfully cleaned up old releases: ${deletedReleases.join(', ')}`);
        }
    }

    private async deleteState(stateName: string) {

        if (this.options.dryRun) {
            this.logger.info(`[DRY RUN] Would have deleted state ConfigMap: ${stateName} for release: ${this.options.releaseName}`);
            return;
        }

        try {
            await this.apiClient.delete(new APIObject(
                'v1',
                'ConfigMap',
                { name: stateName, namespace: this.options.namespace },
            ));
            
        } catch (error) {
            this.logger.error(`Failed to delete state: ${stateName}`);
            throw error;
        }
    }

    private createLabelSelector(labels: Record<string, string>): string {
        return Object
            .entries(labels)
            .map(([key, value]) => `${key}=${value}`)
            .join(',');
    }

    private async getExistingResource(resource: APIObject) {

        this.logger.info(`Checking for existing resource in cluster - ${resource.getIdentifier()}`);

        const identifierParts = resource.getIdentifierParts();

        const apiResource = {
            apiVersion: identifierParts.apiVersion,
            kind: identifierParts.kind,
            metadata: {
                name: identifierParts.name,
                namespace: identifierParts.namespace,
            },
        }

        try {
            const existing = await this.apiClient.read(apiResource);
            return existing;
        } catch (err: any) {
            if (err.code === 404) {
                return null;
            }
            throw err;
        }
    }

    private async createResource(resource: APIObject): Promise<APIObject> {

        if (this.options.dryRun) {
            this.logger.info(`[DRY RUN] Would have created resource: ${resource.getIdentifier()}`);
            return null;
        }

        const fullName = resource.getIdentifier();

        try {
            await this.notifyEventListeners(
                KubernetesLifecycleEvent.PRE_CREATE, 
                new PreCreateEventPayload(resource),
            );

            resource.setLabel(MANAGED_BY_LABEL, MANAGED_BY);
            resource.setLabel(RELEASE_NAME_LABEL, this.options.releaseName);

            const created = await this.apiClient.create(
                resource
            );

            await this.notifyEventListeners(
                KubernetesLifecycleEvent.POST_CREATE, 
                new PostCreateEventPayload(resource, created),
            );

            this.logger.info(`Created resource: ${fullName}`);
            await this.waitForResourceReady(resource);
            return created as APIObject;
        } catch (err: any) {
            this.logger.error(`Failed to create resource: ${fullName}`);
            throw err;
        }
    }
    
    private async patchResource(
        resource: APIObject, 
        existingResource: k8sClient.KubernetesObject,
    ) {

        if (this.options.dryRun) {
            this.logger.info(`[DRY RUN] Would have patched resource: ${resource.getIdentifier()}`);
            return null;
        }

        const fullName = resource.getIdentifier();

        try {
            await this.notifyEventListeners(
                KubernetesLifecycleEvent.PRE_PATCH, 
                new PrePatchEventPayload(resource),
            );

            resource.setLabel(MANAGED_BY_LABEL, MANAGED_BY);
            resource.setLabel(RELEASE_NAME_LABEL, this.options.releaseName);

            const patch = jsonmergepatch.generate(existingResource, resource);

            patch.apiVersion = resource.apiVersion;
            patch.kind = resource.kind;
            patch.metadata = resource.metadata;

            this.logger.debug(patch, `Generated patch for resource ${fullName}`);

            const patched = await this.apiClient.patch(
                patch,
            );

            this.logger.debug(patched, `Patched resource ${fullName}`);

            await this.notifyEventListeners(
                KubernetesLifecycleEvent.POST_PATCH, 
                new PostPatchEventPayload(resource, patched),
            );

            this.logger.info(`Patched resource: ${fullName}`);
            await this.waitForResourceReady(resource);
            return patched;
        } catch (err: any) {
            this.logger.error(`Failed to patch resource: ${fullName}`);
            throw err;
        }
    }

    private async deleteResource(resource: APIObject) {

        if (this.options.dryRun) {
            this.logger.info(`[DRY RUN] Would have deleted resource: ${resource.getIdentifier()}`);
            return null;
        }

        const fullName = resource.getIdentifier();

        try {
            await this.notifyEventListeners(
                KubernetesLifecycleEvent.PRE_DELETE, 
                new PreDeleteEventPayload(resource),
            );
            
            const deleted = await this.apiClient.delete(resource);

            await this.notifyEventListeners(
                KubernetesLifecycleEvent.POST_DELETE,
                // @ts-ignore
                new PostDeleteEventPayload(resource, deleted),
            );

            this.logger.info(`Deleted resource: ${fullName}`);
            return deleted;
        } catch (err: any) {
            this.logger.error(`Failed to delete resource: ${fullName}`);
            throw err;
        }
    }

    private async waitForResourceReady(resource: APIObject) {

        await this.notifyEventListeners(
            KubernetesLifecycleEvent.PRE_WAIT, 
            new PreWaitEventPayload(resource),
        );

        const waiter = this.waiterTypes.get(resource.getFullResourceType());

        if (!waiter) {
            this.logger.debug(`No waiter registered for resource type: ${resource.getFullResourceType()}. Skipping wait.`);
            await this.notifyEventListeners(
                KubernetesLifecycleEvent.POST_WAIT, 
                new PostWaitEventPayload(resource, WaitResult.SKIPPED),
            );
            return;
        }

        const startTime = Date.now();

        const resourceSpecificTimeout = this.options.resourceWaitTimeouts.get(resource.getFullResourceType());
        const timeoutMillis = resourceSpecificTimeout 
            ? resourceSpecificTimeout * SECONDS_IN_MILLIS 
            : this.options.waitTimeoutSeconds * SECONDS_IN_MILLIS;

        const intervalMillis = this.options.waitIntervalSeconds * SECONDS_IN_MILLIS;

        const fullResourceName = resource.getIdentifier();

        while (true) {

            const existingResource = await this.getExistingResource(resource);

            if (existingResource) {
                const isReady = await waiter.checkCondition(existingResource);
                if (isReady) {
                    this.logger.info(`Resource is ready: ${fullResourceName}`);
                    await this.notifyEventListeners(
                        KubernetesLifecycleEvent.POST_WAIT, 
                        new PostWaitEventPayload(resource, WaitResult.READY),
                    );
                    return;
                }
            } else {
                const message = `Resource not found while waiting for readiness: ${fullResourceName}`;
                this.logger.warn(message);
                await this.notifyEventListeners(
                    KubernetesLifecycleEvent.POST_WAIT, 
                    new PostWaitEventPayload(resource, WaitResult.ERROR),
                );
                throw new Error(message);
            }

            if (Date.now() - startTime > timeoutMillis) {
                await this.notifyEventListeners(
                    KubernetesLifecycleEvent.POST_WAIT, 
                    new PostWaitEventPayload(resource, WaitResult.TIMEOUT),
                );
                throw new Error(`Timeout waiting for resource to be ready: ${fullResourceName}`);
            }

            await new Promise(resolve => setTimeout(resolve, intervalMillis));
        }
    }
}

function sortByCreationTimestamp(a: k8sClient.KubernetesObject, b: k8sClient.KubernetesObject): number {
    const aTime = a.metadata?.creationTimestamp ? new Date(a.metadata.creationTimestamp).getTime() : 0;
    const bTime = b.metadata?.creationTimestamp ? new Date(b.metadata.creationTimestamp).getTime() : 0;
    return bTime - aTime;
}
