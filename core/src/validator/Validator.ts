import { Application } from "../Application.js";
import { ServiceSelectorRule } from "./rules/ServiceSelectorRule.js";
import { ValidationError } from "./ValidationError.js";
import { ValidationRule } from "./ValidationRule.js";

export class Validator {

    private application: Application;

    private rules: ValidationRule[] = [];

    constructor (application: Application) {
        this.application = application;

        this.rules.push(...[
            new ServiceSelectorRule(),
        ]);
    }

    async validate(staticOnly: boolean): Promise<ValidationError[]> {

        const resources = this.application.getResources();

        const results: ValidationError[] = [];
        for (const rule of this.rules) {
            if (staticOnly && rule.isDynamicRule()) {
                continue;
            }

            const result = await rule.validate(resources);
            results.push(...result);
        }
        return results;
    }

    addRule(rule: ValidationRule) {
        this.rules.push(rule);
    }

    removeRule(ruleName: string) {
        this.rules = this.rules.filter(r => r.name !== ruleName);
    }
}
