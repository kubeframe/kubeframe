import { ListMeta, ListMetaProperties } from "../generated/meta/v1/ListMeta.js";
import { APIResource } from "./APIResource.js";

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

export function isAPIObjectList(resource: APIResource): resource is APIObjectList {
    return resource instanceof APIObjectList;
}
