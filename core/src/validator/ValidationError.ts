export class ValidationError {
    ruleName: string;
    resourceName?: string;
    error?: string;

    constructor(
        ruleName: string,
        resourceName?: string,
        error?: string,
    ) {
        this.ruleName = ruleName;
        this.resourceName = resourceName;
        this.error = error;
    }
}
