import { APIObject, k8s } from "../../index.js";
import { ValidationError } from "../ValidationError.js";
import { ValidationRule } from "../ValidationRule.js";

export class ServiceSelectorRule extends ValidationRule {

    constructor() {
        super(ServiceSelectorRule.name, false);
    }

    async validate(resources: APIObject[]): Promise<ValidationError[]> {

        const results: ValidationError[] = [];

        const services = resources.filter(resource => k8s.core.v1.Service.is(resource));
        const deployments = resources.filter(resource => k8s.apps.v1.Deployment.is(resource));

        for (const service of services) {
            const selector = service.spec?.selector;

            const matchingDeployments = deployments.filter(deploymentResource => {
                const deployment = deploymentResource;
                return deployment.spec?.selector?.matchLabels && 
                    selector && 
                    Object.keys(selector).every(key => selector[key] === deployment.spec.selector.matchLabels[key]);
            });

            if (matchingDeployments.length === 0) {
                results.push(new ValidationError(
                    this.name,
                    service.getName(),
                    `Service '${service.metadata.name}' has a selector ${JSON.stringify(selector)} that does not match any Deployment.`,
                ));
            }
        }

        return results;
    }
}
