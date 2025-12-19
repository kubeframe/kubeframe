import { APIObject } from "../../../base/APIObject.js";

export abstract class ResourceWaiter {
    
    private readonly resourceType: string;

    constructor(resourceType: string) {
        this.resourceType = resourceType;
    }

    getResourceType(): string {
        return this.resourceType;
    }

    abstract checkCondition(resource: APIObject): Promise<boolean>;

}
