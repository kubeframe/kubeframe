import { plainToInstance, Type } from "class-transformer";
import { k8s, ValueReference } from "@kubeframe/kubeframe-version";
import { readFileSync } from "fs";
import * as YAML from 'yaml';

export class Container {
    name!: string;
    // When using types from @kubeframe/kubeframe, schemas will contain documentation linking to the official Kubernetes documentation.
    resources?: k8s.core.v1.ResourceRequirementsProperties = {
        limits: {
            cpu: "100m",
            memory: "128Mi",
        },
        requests: {
            cpu: "100m",
            memory: "128Mi",
        },
    };
}

export class Deployment {
    /**
     * Name of the deployment
     */
    name!: string;

    @Type(() => Container)
    containers!: Container[];

    replicas?: k8s.apps.v1.DeploymentSpecProperties['replicas'] = 1;
}

export class Service {
    /**
     * Name of the service
     */
    name!: string;

    ports!: k8s.core.v1.ServicePortProperties[];

    selector!: { [key: string]: string };
}

export class Configuration {
    /**
     * Deployments to be created
     */
    @Type(() => Deployment)
    deployments?: Deployment[];

    /**
     * Services to be created
     */
    @Type(() => Service)
    services?: Service[];

    static load(filePath: string): Configuration {
        const rawJson = YAML.parse(readFileSync(filePath, 'utf8'));
        return plainToInstance(Configuration, rawJson);
    }
}
