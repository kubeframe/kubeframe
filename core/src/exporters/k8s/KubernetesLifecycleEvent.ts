import { APIObject, APIResource } from "../../base/APIResource.js";
import { k8s } from "../../index.js";

export enum KubernetesLifecycleEvent {
    /**
     * Fired before a resource is created.
     */
    PRE_CREATE = 'k8s.preCreate',
    /**
     * Fired after a resource is created.
     */
    POST_CREATE = 'k8s.postCreate',
    /**
     * Fired before a resource is patched.
     */
    PRE_PATCH = 'k8s.prePatch',
    /**
     * Fired after a resource is patched.
     */
    POST_PATCH = 'k8s.postPatch',
    /**
     * Fired before a resource is deleted.
     */
    PRE_DELETE = 'k8s.preDelete',
    /**
     * Fired after a resource is deleted.
     */
    POST_DELETE = 'k8s.postDelete',
    /**
     * Fired before a resource is waited for readiness.
     */
    PRE_WAIT = 'k8s.preWait',
    /**
     * Fired after a resource is waited for readiness.
     */
    POST_WAIT = 'k8s.postWait',
    /**
     * Fired when a release is expired and the state of the release is being deleted.
     */
    RELEASE_EXPIRED = 'k8s.releaseExpired',
}

export class PreCreateEventPayload {
    constructor(public resource: APIResource) {}
}

export class PostCreateEventPayload {
    constructor(public resource: APIResource, public response: APIResource) {}
}

export class PrePatchEventPayload {
    constructor(public resource: APIResource, public existingResource: APIObject, public patch: any) {}
}

export class PostPatchEventPayload {
    constructor(public resource: APIResource, public response: APIObject) {}
}

export class PreDeleteEventPayload {
    constructor(public resource: APIResource) {}
}

export class PostDeleteEventPayload {
    constructor(public resource: APIResource, public response: APIResource) {}
}

export class PreWaitEventPayload {
    constructor(public resource: APIResource) {}
}

export class PostWaitEventPayload {
    constructor(public resource: APIResource, public result: WaitResult) {}
}

export class ReleaseExpiredEventPayload {
    /**
     * @param releaseName The name of the release that is expired.
     * @param resources State of the resources in the release.
     */
    constructor(
        public releaseName: string, 
        public resources: APIResource[],
        public metadata: Record<string, string>,
        public configMap: k8s.core.v1.ConfigMap,
    ) {}
}

export enum WaitResult {
    READY = 'ready',
    TIMEOUT = 'timeout',
    ERROR = 'error',
    SKIPPED = 'skipped',
}

export type KubernetesLifecycleEventPayload = 
    | PreCreateEventPayload 
    | PostCreateEventPayload 
    | PrePatchEventPayload 
    | PostPatchEventPayload 
    | PreDeleteEventPayload 
    | PostDeleteEventPayload 
    | PreWaitEventPayload 
    | PostWaitEventPayload
    | ReleaseExpiredEventPayload;