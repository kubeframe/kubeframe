import { APIObject } from "../../base/APIObject.js";
import { k8s } from "../../index.js";

export class ReleaseState {
    constructor(
        public name: string,
        public resources: APIObject[],
        public metadata: Record<string, string>,
        public configMap: k8s.core.v1.ConfigMap,
    ) {}
}
