import { Application, ResourceFilter } from "./Application.js";
import { APIObject } from "./base/APIObject.js";
import { DependencyKey } from "./base/Types.js";
import { isNamespacedAPIObject } from "./base/NamespacedAPIObject.js";

export const COMPONENT_NAME_LABEL = 'app.kubernetes.io/component';
export const PART_OF_LABEL = 'app.kubernetes.io/part-of';

/**
 * Logical component of an application which can be composed of one or more resources.
 */
export abstract class Component {

    private name: string;

    private application?: Application;

    private commonLabels: Record<string, string> = {};

    private commonAnnotations: Record<string, string> = {};

    private resources: Map<DependencyKey, APIObject> = new Map();

    constructor(name: string) {
        this.name = name;
        this.setCommonLabel(COMPONENT_NAME_LABEL, name);
    }

    abstract build(): Promise<void>;

    getName() {
        return this.name;
    }

    getResources(filter?: ResourceFilter): APIObject[] {
        return Array.from(this.resources.values()).filter(filter ?? (() => true));
    }

    /**
     * Set the application for the component.
     * @param application The application to set.
     */
    setApplication(application: Application) {
        this.application = application;
        this.setCommonLabel(COMPONENT_NAME_LABEL, this.name);
        this.setCommonLabel(PART_OF_LABEL, application.getName());

        this.resources.forEach(resource => {
            this.resolveDependencies(resource);
        });
    }

    getApplication() {
        return this.application;
    }

    /**
     * Add a resource to the component.
     * @param resource The resource to add.
     */
    addResource(resource: APIObject) {

        resource.setLabels({
            ...resource.getLabels(),
            ...this.commonLabels,
        });

        resource.setAnnotations({
            ...resource.getAnnotations(),
            ...this.commonAnnotations,
        });

        this.resources.set(resource.getIdentifier(), resource);
        resource.setComponent(this);

        this.resolveDependencies(resource);
    }

    private resolveDependencies(resource: APIObject) {
        const allResources = this.application?.getResourcesMap() ?? new Map();
        const dependencies = resource.getDependencies();
        for (const dependency of dependencies) {
            const dependentResource = allResources.get(dependency);
            if (dependentResource) {
                dependentResource.addDependent(resource.getIdentifier());
            }
        }
    }

    /**
     * Set the namespace for all namespaced resources in the component.
     * If the resource already has a namespace, it will not be changed.
     * @param namespace The namespace to set.
     */
    setNamespace(namespace: string) {

        const allResources = this.application?.getResources() ?? [];

        this.resources.forEach(resource => {
            if (isNamespacedAPIObject(resource)) {

                if (resource.getNamespace()) {
                    return;
                }

                const currentIdentifier = resource.getIdentifier();
                resource.setNamespace(namespace);
                const newIdentifier = resource.getIdentifier();
                
                allResources.forEach(r => {
                    if (r.hasDependency(currentIdentifier)) {
                        r.replaceDependency(currentIdentifier, newIdentifier);
                    }
                });
            }
        });
    }

    setCommonLabel(key: string, value: string) {
        this.commonLabels[key] = value;
        for (const resource of this.resources.values()) {
            resource.setLabel(key, value);
        }
    }

    removeCommonLabel(key: string) {
        delete this.commonLabels[key];
        for (const resource of this.resources.values()) {
            resource.removeLabel(key);
        }
    }

    /**
     * Get common labels.
     * @returns A copy of the common labels.
     */
    getCommonLabels(): Record<string, string> {
        return { ...this.commonLabels };
    }

    /**
     * Get common annotations.
     * @returns A copy of the common annotations.
     */
    getCommonAnnotations(): Record<string, string> {
        return { ...this.commonAnnotations };
    }

    setCommonAnnotation(key: string, value: string) {
        this.commonAnnotations[key] = value;
        for (const resource of this.resources.values()) {
            resource.setAnnotation(key, value);
        }
    }

    removeCommonAnnotation(key: string) {
        delete this.commonAnnotations[key];
        for (const resource of this.resources.values()) {
            resource.removeAnnotation(key);
        }
    }
}
