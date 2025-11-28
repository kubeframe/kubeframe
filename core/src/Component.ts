import { Application, ResourceFilter } from "./Application.js";
import { APIObject, DependencyKey, isNamespacedAPIObject } from "./base/APIResource.js";

const COMPONENT_NAME_LABEL = 'app.kubernetes.io/component';
const PART_OF_LABEL = 'app.kubernetes.io/part-of';

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
        this.setCommonLabels({
            [COMPONENT_NAME_LABEL]: name,
        });
    }

    abstract build(): Promise<void>;

    getName() {
        return this.name;
    }

    getResources(filter?: ResourceFilter): APIObject[] {
        return Array.from(this.resources.values()).filter(filter ?? (() => true));
    }

    setApplication(application: Application) {
        this.application = application;
        this.setCommonLabels({
            [COMPONENT_NAME_LABEL]: this.name,
            [PART_OF_LABEL]: application.getName(),
        });

        this.resources.forEach(resource => {
            this.resolveDependencies(resource);
        });
    }

    getApplication() {
        return this.application;
    }

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

    setCommonLabels(labels: Record<string, string>) {
        const oldLabels = { ...this.commonLabels };
        this.commonLabels = { ...labels };
        this.onLabelsChanged(oldLabels, this.commonLabels);
    }

    setCommonAnnotations(annotations: Record<string, string>) {
        const oldAnnotations = { ...this.commonAnnotations };
        this.commonAnnotations = { ...annotations };
        this.onAnnotationsChanged(oldAnnotations, this.commonAnnotations);
    }

    getCommonLabels(): Record<string, string> {
        return { ...this.commonLabels };
    }

    getCommonAnnotations(): Record<string, string> {
        return { ...this.commonAnnotations };
    }

    onLabelsChanged(oldLabels: Record<string, string>, newLabels: Record<string, string>) {
        this.resources.forEach(resource => {
            // Remove old labels
            for (const key in oldLabels) {
                resource.removeLabel(key);
            }
            // Add new labels
            for (const key in newLabels) {
                resource.setLabel(key, newLabels[key]);
            }
        });
    }

    onAnnotationsChanged(oldAnnotations: Record<string, string>, newAnnotations: Record<string, string>) {
        this.resources.forEach(resource => {
            // Remove old annotations
            for (const key in oldAnnotations) {
                resource.removeAnnotation(key);
            }
            // Add new annotations
            for (const key in newAnnotations) {
                resource.setAnnotation(key, newAnnotations[key]);
            }
        });
    }
}
