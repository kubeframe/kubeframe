import { APIResource } from "./APIResource.js";
import { Component } from "../Component.js";
import { APIResourceIdentifierParts, DependencyKey } from "./Types.js";
import { ObjectMeta, ObjectMetaProperties } from "../generated/meta/v1/ObjectMeta.js";
import {
    ROLLBACK_ALLOWED_ANNOTATION, 
    DEPENDS_ON_ANNOTATION, 
    DEPENDENTS_ANNOTATION,
} from "./Constants.js";

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
            this.addChild(this.metadata);
        } else {
            this.metadata = metadata;
            this.addChild(this.metadata);
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

export function isAPIObject(resource: APIObject): resource is APIObject {
    return resource instanceof APIObject;
}
