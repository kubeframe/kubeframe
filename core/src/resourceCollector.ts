import { APIResource } from "@kubeframe/k8s/base/APIResource.js";

export interface SourceInfo {
    frameName: string;
    data?: Map<string, any>;
}

export interface CollectedResource {
    sourceInfo: SourceInfo;
    resource: APIResource;
}

export class ResourceCollector {

    private resources: CollectedResource[] = [];

    addResource(sourceInfo: SourceInfo, resource: APIResource) {
        this.resources.push({
            sourceInfo,
            resource,
        });
    }

    getResources(): CollectedResource[] {
        return this.resources;
    }
}
