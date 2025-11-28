import { APIResource } from "../../base/APIResource.js";

export enum KubernetesLifecycleEvent {
    PRE_CREATE = 'k8s.preCreate',
    POST_CREATE = 'k8s.postCreate',
    PRE_PATCH = 'k8s.prePatch',
    POST_PATCH = 'k8s.postPatch',
    PRE_DELETE = 'k8s.preDelete',
    POST_DELETE = 'k8s.postDelete',
    PRE_WAIT = 'k8s.preWait',
    POST_WAIT = 'k8s.postWait',
}

export class PreCreateEventPayload {
    constructor(public resource: APIResource) {}
}
export class PostCreateEventPayload {
    constructor(public resource: APIResource, public response: APIResource) {}
}

export class PrePatchEventPayload {
    constructor(public resource: APIResource) {}
}
export class PostPatchEventPayload {
    constructor(public resource: APIResource, public response: APIResource) {}
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
    | PostWaitEventPayload;