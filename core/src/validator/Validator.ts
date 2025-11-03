import { ResourceCollector } from "../ResourceCollector.js";
import { ServiceSelectorRule } from "./ServiceSelectorRule.js";
import { ValidationError } from "./ValidationError.js";
import { ValidationRule } from "./ValidationRule.js";

export class Validator {

    private resourceCollector: ResourceCollector;

    private rules: ValidationRule[] = [];

    constructor (resourceCollector: ResourceCollector) {
        this.resourceCollector = resourceCollector;

        this.rules.push(...[
            new ServiceSelectorRule(),
        ]);
    }

    async validate(staticOnly: boolean): Promise<ValidationError[]> {

        const resources = this.resourceCollector.getResources();

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
