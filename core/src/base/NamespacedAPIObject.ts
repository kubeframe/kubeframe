import { ObjectMeta, ObjectMetaProperties } from "../generated/meta/v1/ObjectMeta.js";
import { APIObject } from "./APIObject.js";
import { APIResourceIdentifierParts } from "./Types.js";

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

export function isNamespacedAPIObject(resource: APIObject): resource is NamespacedAPIObject {
    return resource instanceof NamespacedAPIObject;
}
