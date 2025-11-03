import { k8s } from "../index.js";
import { CollectedResource } from "../ResourceCollector.js";
import { ValidationError } from "./ValidationError.js";
import { ValidationRule } from "./ValidationRule.js";

export class ServiceSelectorRule extends ValidationRule {

    constructor() {
        super(ServiceSelectorRule.name, false);
    }

    async validate(resources: CollectedResource[]): Promise<ValidationError[]> {

        const results: ValidationError[] = [];

        const services = resources.filter(r => r.resource.kind === 'Service' && r.resource.apiVersion === 'v1');
        const deployments = resources.filter(r => r.resource.kind === 'Deployment' && r.resource.apiVersion === 'apps/v1');

        for (const serviceResource of services) {
            const service = serviceResource.resource as k8s.core.v1.Service;
            const selector = service.spec?.selector;

            const matchingDeployments = deployments.filter(deploymentResource => {
                const deployment = deploymentResource.resource as k8s.apps.v1.Deployment;
                return deployment.spec?.selector?.matchLabels && 
                    selector && 
                    Object.keys(selector).every(key => selector[key] === deployment.spec.selector.matchLabels[key]);
            });

            if (matchingDeployments.length === 0) {
                results.push(new ValidationError(
                    this.name,
                    serviceResource.resource.metadata.name,
                    `Service '${service.metadata.name}' has a selector ${JSON.stringify(selector)} that does not match any Deployment.`,
                ));
            }
        }

        return results;
    }
}
