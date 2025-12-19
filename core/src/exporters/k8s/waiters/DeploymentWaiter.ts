import { getLogger } from "../../../Logger.js";
import { ResourceWaiter } from "./ResourceWaiter.js";
import { APIObject } from "../../../base/APIObject.js";
import { k8s } from "../../../index.js";

export class DeploymentWaiter extends ResourceWaiter {

    private logger = getLogger().child({ component: DeploymentWaiter.name });

    constructor() {
        super('apps/v1/Deployment');
    }

    async checkCondition(deployment: APIObject): Promise<boolean> {

        if (!k8s.apps.v1.Deployment.is(deployment)) {
            throw new Error('Invalid deployment object');
        }

        const replicas = deployment.spec?.replicas;
        const availableReplicas = deployment.status?.availableReplicas;
        const updatedReplicas = deployment.status?.updatedReplicas;

        const generation = deployment.metadata?.generation;
        const observedGeneration = deployment.status?.observedGeneration;

        if ((generation && observedGeneration) && observedGeneration >= generation) {

            if (replicas === undefined || availableReplicas === undefined || updatedReplicas === undefined) {
                this.logger.info(`Deployment ${deployment.metadata?.name} is not ready yet. Missing replica information.`);
                return false;
            }

            if (replicas === availableReplicas && replicas === updatedReplicas) {
                this.logger.info(`Deployment ${deployment.metadata?.name} is ready.`);
                return true;
            } else {
                this.logger.info(`Deployment not ready yet: ${deployment.metadata?.name}. Replicas: ${replicas}, Available: ${availableReplicas}, Updated: ${updatedReplicas}`);
                return false;
            }
        }

        return false;
    }
}
