import { CollectedResource } from "../ResourceCollector.js";
import { ValidationError } from "./ValidationError.js";

export abstract class ValidationRule {

    name: string;

    isDynamic: boolean;

    constructor(name: string, isDynamic: boolean) {
        this.name = name;
        this.isDynamic = isDynamic;
    }

    abstract validate(resources: CollectedResource[]): Promise<ValidationError[]>;

    isDynamicRule(): boolean {
        return this.isDynamic;
    }
}
