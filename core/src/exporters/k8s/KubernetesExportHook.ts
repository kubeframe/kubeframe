import { APIObject } from "../../base/APIObject.js";
import { APIResource } from "../../base/APIResource.js";
import { k8s } from "../../index.js";
import { ReleaseState } from "./ReleaseState.js";

export enum KubernetesExportHook {

    /**
     * Fired before the state of the release is parsed.
     */
    PRE_PARSE_STATE = 'k8s.preParseState',
    /**
     * Fired after the state of the release is parsed.
     */
    POST_PARSE_STATE = 'k8s.postParseState',
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

export class PreParseStateHookPayload {
    constructor(public configMap: k8s.core.v1.ConfigMap) {}
}

export class PostParseStateHookPayload {
    constructor(public state: ReleaseState) {}
}

export class PreCreateHookPayload {
    constructor(public resource: APIResource) {}
}

export class PostCreateHookPayload {
    constructor(public resource: APIResource, public response: APIResource) {}
}

export class PrePatchHookPayload {
    constructor(public resource: APIResource, public existingResource: APIObject, public patch: any) {}
}

export class PostPatchHookPayload {
    constructor(public resource: APIResource, public response: APIObject) {}
}

export class PreDeleteHookPayload {
    constructor(public resource: APIResource) {}
}

export class PostDeleteHookPayload {
    constructor(public resource: APIResource, public response: APIResource) {}
}

export class PreWaitHookPayload {
    constructor(public resource: APIResource) {}
}

export class PostWaitHookPayload {
    constructor(public resource: APIResource, public result: WaitResult) {}
}

export class ReleaseExpiredHookPayload {
    /**
     * @param state The state of the release that is expired.
     */
    constructor(
        public state: ReleaseState,
    ) {}
}

export enum WaitResult {
    READY = 'ready',
    TIMEOUT = 'timeout',
    ERROR = 'error',
    SKIPPED = 'skipped',
}

export type KubernetesExportHookPayload = 
    | PreParseStateHookPayload 
    | PostParseStateHookPayload 
    | PreCreateHookPayload 
    | PostCreateHookPayload 
    | PrePatchHookPayload 
    | PostPatchHookPayload 
    | PreDeleteHookPayload 
    | PostDeleteHookPayload 
    | PreWaitHookPayload 
    | PostWaitHookPayload
    | ReleaseExpiredHookPayload;
