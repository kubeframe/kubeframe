import { APIObject, APIResource, DependencyKey } from "./base/APIResource.js";
import { Component } from "./Component.js";
import { getLogger } from "./Logger.js";

const APPLICATION_NAME_LABEL = 'app.kubernetes.io/name';

export type ResourceFilter = (resource: APIObject) => boolean;

export abstract class Application {

    private logger = getLogger().child({ component: Application.name });

    private name: string;

    private components: Map<string, Component> = new Map();

    private commonLabels: Map<string, string> = new Map();

    private commonAnnotations: Map<string, string> = new Map();

    constructor(name: string) {
        this.name = name;
        this.addCommonLabel(APPLICATION_NAME_LABEL, name);
    }

    abstract build(): Promise<void>;

    async buildAll() {

        await this.build();

        for (const component of this.components.values()) {
            await component.build();
        }
    }

    getName() {
        return this.name;
    }

    addComponent(component: Component) {
        this.components.set(component.getName(), component);
        component.setApplication(this);
    }

    getComponents() {
        return Array.from(this.components.values());
    }

    getResources(filter?: ResourceFilter): APIObject[] {
        return Array
            .from(this.components.values())
            .flatMap(component => Array.from(component.getResources().values()))
            .filter(filter || (() => true));
    }

    getResourcesMap(): Map<DependencyKey, APIObject> {
        const resourcesMap = new Map<DependencyKey, APIObject>();
        for (const component of this.components.values()) {
            for (const resource of component.getResources()) {
                resourcesMap.set(resource.getIdentifier(), resource);
            }
        }
        return resourcesMap;
    }

    getDependencyMap(): Map<DependencyKey, DependencyKey[]> {
        const resources = this.getResources();
        const dependencyMap = new Map<DependencyKey, DependencyKey[]>();
        for (const resource of resources) {
            const dependencies = resource.getDependencies();
            for (const dependency of dependencies) {
                dependencyMap.set(
                    resource.getIdentifier(),
                    [
                        ...(dependencyMap.get(resource.getIdentifier()) || []), dependency,
                    ],
                );
            }
        }

        return dependencyMap;
    }

    getSortedResources(filter?: ResourceFilter): APIObject[] {
        return this.dependencyBasedSort(this.getResources(filter), this.getDependencyMap());
    }

    getComponent(name: string): Component | undefined {
        return this.components.get(name);
    }

    setNamespace(namespace: string) {
        this.components.forEach(component => {
            component.setNamespace(namespace);
        });
    }

    addCommonLabel(key: string, value: string) {
        this.commonLabels.set(key, value);
    }

    addCommonAnnotation(key: string, value: string) {
        this.commonAnnotations.set(key, value);
    }

    getCommonLabels(): Map<string, string> {
        return new Map(this.commonLabels);
    }

    getCommonAnnotations(): Map<string, string> {
        return new Map(this.commonAnnotations);
    }

    removeCommonLabel(key: string) {
        this.commonLabels.delete(key);
    }
    
    removeCommonAnnotation(key: string) {
        this.commonAnnotations.delete(key);
    }

    clearCommonLabels() {
        this.commonLabels.clear();
    }
    
    clearCommonAnnotations() {
        this.commonAnnotations.clear();
    }

    private dependencyBasedSort(
        resources: APIObject[], 
        dependencyMap: Map<DependencyKey, DependencyKey[]>,
    ): APIObject[] {
        const nameToResource = new Map<string, APIObject>();
        const graph = new Map<string, string[]>(); // key -> dependsOn keys
    
        // Step 1. Index all resources
        for (const resource of resources) {
            const key = resource.getIdentifier();
            nameToResource.set(key, resource);
            graph.set(key, dependencyMap.get(key) ?? []);
        }
    
        // Step 2. Perform topological sort
        const sortedKeys: string[] = [];
        const visited = new Set<string>();
        const visiting = new Set<string>();
    
        const visit = (key: string) => {
            if (visited.has(key)) {
                return;
            }
    
            if (visiting.has(key)) {
                throw new Error(`Dependency cycle detected involving ${key}`);
            }
    
            visiting.add(key);
    
            const dependencies = graph.get(key) || [];
            for (const dependency of dependencies) {
                if (!graph.has(dependency)) {
                    this.logger.warn(`Missing dependency: ${dependency} (required by ${key})`);
                    continue;
                }
                visit(dependency);
            }
    
            visiting.delete(key);
            visited.add(key);
            sortedKeys.push(key);
        };
    
        for (const key of graph.keys()) {
            visit(key);
        }
    
        // Step 3. Return resources in sorted order
        return sortedKeys.map(key => nameToResource.get(key)!);
    }
}
