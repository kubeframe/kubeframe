import { ObjectMeta, NamespacedObjectMeta } from "../meta/v1/ObjectMeta";

/**
 * Base class for all API resources.
 */
export class APIResource<MetaType extends ObjectMeta = ObjectMeta> {
    apiVersion: string;
    kind: string;
    metadata: MetaType;

    constructor(apiVersion: string, kind: string, metadata: MetaType) {
        this.apiVersion = apiVersion;
        this.kind = kind;
        this.metadata = metadata;
    }

    isNamespaced(): boolean {
        return false;
    }

    getIdentifier(): string {
        return `${this.apiVersion}/${this.kind}/${this.metadata.name}`;
    }

    /**
     * Compares this resource with another resource to determine if they are duplicates based on
     * group, version, kind, and name. Contents are not compared.
     * 
     * @param other 
     * @returns 
     */
    isDuplicate(other: APIResource): boolean {
        return this.getIdentifier() === other.getIdentifier();
    }
}

/**
 * Base class for all API resources that are namespaced.
 */
export class NamespacedAPIResource extends APIResource<NamespacedObjectMeta> {

    constructor(apiVersion: string, kind: string, metadata: NamespacedObjectMeta) {
        super(apiVersion, kind, metadata);
    }

    isNamespaced(): boolean {
        return true;
    }

    getIdentifier(): string {
        return `${this.apiVersion}/${this.kind}/${this.metadata.namespace}/${this.metadata.name}`;
    }
}
