import { Component } from "../Component.js";
import { ListMeta, ListMetaProperties } from "../generated/meta/v1/ListMeta.js";
import { KubernetesType } from "./KubernetesType.js";
import { APIObject } from "./APIObject.js";
import { NamespacedAPIObject } from "./NamespacedAPIObject.js";

/**
 * Base class for all API resources.
 */
export abstract class APIResource extends KubernetesType {

    apiVersion: string;

    kind: string;

    constructor(apiVersion: string, kind: string) {
        super();
        this.apiVersion = apiVersion;
        this.kind = kind;
    }

    getApiVersion(): string {
        return this.apiVersion;
    }

    getKind(): string {
        return this.kind;
    }
}
