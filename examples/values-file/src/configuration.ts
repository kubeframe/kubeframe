import { plainToInstance, Type } from "class-transformer";
import { k8s } from "@kubeframe/k8s";
import { readFileSync } from "fs";
import * as YAML from 'yaml';

export class Container {
    name!: string;
    // When using types from @kubeframe/k8s, schemas will contain documentation linking to the official Kubernetes documentation.
    resources: k8s.core.v1.ResourceRequirements = {
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
}

export class Configuration {
    /**
     * Deployments to be created
     */
    @Type(() => Deployment)
    deployments?: Deployment[];

    static load(filePath: string): Configuration {
        const rawJson = YAML.parse(readFileSync(filePath, 'utf8'));
        return plainToInstance(Configuration, rawJson);
    }
}
