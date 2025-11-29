import { Component } from "../Component.js";
import { ObjectMeta, ObjectMetaProperties } from "../generated/meta/v1/ObjectMeta.js";
import { ListMeta, ListMetaProperties } from "../generated/meta/v1/ListMeta.js";

export interface APIResourceIdentifierParts {
    apiVersion: string;
    kind: string;
    namespace?: string;
    name: string;
}

export type DependencyKey = string;

const ROLLBACK_ALLOWED_ANNOTATION = 'app.kubernetes.io/rollback-allowed';
const DEPENDS_ON_ANNOTATION = 'app.kubernetes.io/depends-on';
const DEPENDENTS_ANNOTATION = 'app.kubernetes.io/dependents';

/**
 * Base class for all API resources.
 */
export abstract class APIResource {

    apiVersion: string;

    kind: string;

    constructor(apiVersion: string, kind: string) {
        this.apiVersion = apiVersion;
        this.kind = kind;
    }

    getApiVersion(): string {
        return this.apiVersion;
    }

    getKind(): string {
        return this.kind;
    }

    abstract toJSON(): any;
}

/**
 * API object that is not namespaced.
 */
export class APIObject extends APIResource {

    component?: Component;
    dependsOn?: DependencyKey[] = [];
    dependents?: DependencyKey[] = [];

    metadata: ObjectMeta;

    constructor(
        apiVersion: string, 
        kind: string, 
        metadata: ObjectMeta | ObjectMetaProperties
    ) {
        super(apiVersion, kind);
        
        if (!(metadata instanceof ObjectMeta)) {
            this.metadata = new ObjectMeta(metadata);
        } else {
            this.metadata = metadata;
        }
    }

    getName(): string {
        return this.metadata.name;
    }

    getLabels(): Record<string, string> {
        return this.metadata.labels || {};
    }

    setLabels(labels: Record<string, string>) {
        this.metadata.labels = labels;
    }

    getLabel(key: string): string | undefined {
        return this.metadata.labels?.[key];
    }

    setLabel(key: string, value: string) {
        this.metadata.labels = this.metadata.labels || {};
        this.metadata.labels[key] = value;
    }

    removeLabel(key: string) {
        delete this.metadata.labels?.[key];
    }

    getAnnotation(key: string): string | undefined {
        return this.metadata.annotations?.[key];
    }

    setAnnotation(key: string, value: string) {
        this.metadata.annotations = this.metadata.annotations || {};
        this.metadata.annotations[key] = value;
    }

    removeAnnotation(key: string) {
        delete this.metadata.annotations?.[key];
    }

    getAnnotations(): Record<string, string> {
        return this.metadata.annotations || {};
    }

    setAnnotations(annotations: Record<string, string>) {
        this.metadata.annotations = annotations;
    }

    getIdentifierParts(): APIResourceIdentifierParts {
        return {
            apiVersion: this.apiVersion,
            kind: this.kind,
            namespace: undefined,
            name: this.getName(),
        };
    }

    getComponent(): Component {
        return this.component;
    }

    setComponent(component: Component) {
        this.component = component;
    }

    getIdentifier(): string {
        return `${this.apiVersion}/${this.kind}/${this.getName()}`;
    }

    getFullResourceType(): string {
        return `${this.apiVersion}/${this.kind}`;
    }

    /**
     * Compares this resource with another resource to determine if they are duplicates based on
     * group, version, kind, and name. Contents are not compared.
     * 
     * @param other 
     * @returns 
     */
    isDuplicate(other: APIObject): boolean {
        return this.getIdentifier() === other.getIdentifier();
    }

    isRollbackAllowed(): boolean {
        return this.getAnnotation(ROLLBACK_ALLOWED_ANNOTATION) !== 'false';
    }

    setRollbackAllowed(allowed: boolean) {
        this.setAnnotation(ROLLBACK_ALLOWED_ANNOTATION, allowed ? 'true' : 'false');
    }

    hasDependency(dependency: DependencyKey): boolean {
        return this.dependsOn?.includes(dependency) ?? false;
    }

    addDependency(dependency: DependencyKey) {
        this.dependsOn.push(dependency);
    }

    getDependencies(): DependencyKey[] {
        return this.dependsOn;
    }

    replaceDependency(oldDependency: DependencyKey, newDependency: DependencyKey) {
        this.dependsOn = this.dependsOn?.filter(d => d !== oldDependency) || [];
        this.dependsOn.push(newDependency);
    }

    addDependent(dependent: DependencyKey) {
        this.dependents.push(dependent);
    }

    hasDependent(dependent: DependencyKey): boolean {
        return this.dependents?.includes(dependent) ?? false;
    }

    getDependents(): DependencyKey[] {
        return this.dependents;
    }

    replaceDependent(oldDependent: DependencyKey, newDependent: DependencyKey) {
        this.dependents = this.dependents?.filter(d => d !== oldDependent) || [];
        this.dependents.push(newDependent);
    }

    toJSON(): any {
        const json = {
            apiVersion: this.apiVersion,
            kind: this.kind,
            metadata: {
                ...this.metadata.toJSON(),
                annotations: {
                    ...this.metadata.annotations,
                    [ROLLBACK_ALLOWED_ANNOTATION]: this.isRollbackAllowed() === false ? 'false' : 'true',
                    [DEPENDS_ON_ANNOTATION]: this.dependsOn?.join(','),
                    [DEPENDENTS_ANNOTATION]: this.dependents?.join(','),
                },
            },
        };

        return json;
    }
}

/**
 * API object that is namespaced.
 */
export class NamespacedAPIObject extends APIObject {

    constructor(
        apiVersion: string, 
        kind: string, 
        metadata: ObjectMeta | ObjectMetaProperties
    ) {
        super(apiVersion, kind, metadata);
    }

    getNamespace(): string | undefined {
        return this.metadata.namespace;
    }

    setNamespace(namespace: string) {
        this.metadata.namespace = namespace;
    }

    isNamespaced(): boolean {
        return true;
    }

    getIdentifier(): string {
        return `${this.apiVersion}/${this.kind}/${this.metadata.namespace || 'default'}/${this.metadata.name}`;
    }

    getIdentifierParts(): APIResourceIdentifierParts {
        return {
            apiVersion: this.apiVersion,
            kind: this.kind,
            namespace: this.metadata.namespace || 'default',
            name: this.metadata.name,
        };
    }
}

/**
 * API object list.
 */
export class APIObjectList extends APIResource {
    
    metadata: ListMeta;

    constructor(apiVersion: string, kind: string, metadata: ListMeta | ListMetaProperties) {
        super(apiVersion, kind);
        if (!(metadata instanceof ListMeta)) {
            this.metadata = new ListMeta(metadata);
        } else {
            this.metadata = metadata;
        }
    }

    toJSON(): any {
        return {
            apiVersion: this.apiVersion,
            kind: this.kind,
            metadata: this.metadata.toJSON(),
        };
    }
}

export function isAPIObject(resource: APIObject): resource is APIObject {
    return resource instanceof APIObject;
}

export function isNamespacedAPIObject(resource: APIObject): resource is NamespacedAPIObject {
    return resource instanceof NamespacedAPIObject;
}

export function isAPIObjectList(resource: APIResource): resource is APIObjectList {
    return resource instanceof APIObjectList;
}