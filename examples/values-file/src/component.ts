import { Component, DependencyKey, k8s } from "@kubeframe/kubeframe-version";
import { Configuration } from "./configuration.js";

export class MyComponent extends Component {

    constructor(private readonly configuration: Configuration) {
        super(MyComponent.name);
    }

    async build(): Promise<void> {

        this.configuration.configMaps?.forEach(configMap => {
            const configMapResource = new k8s.core.v1.ConfigMap({
                metadata: {
                    name: configMap.name,
                },
                data: configMap.data,
            });

            this.addResource(configMapResource);
        });


        this.configuration.deployments?.forEach(deployment => {

            const dependencies: DependencyKey[] = [];
            const deploymentResource = new k8s.apps.v1.Deployment({
                metadata: new k8s.meta.v1.ObjectMeta({
                    name: deployment.name,
                }),
                spec: {
                    replicas: deployment.replicas,
                    selector: {
                        matchLabels: {
                            app: deployment.name,
                        }
                    },
                    template: {
                        metadata: {
                            labels: {
                                app: deployment.name,
                            },
                        },
                        spec: {
                            containers: deployment.containers.map(container => ({
                                name: container.name,
                                image: container.image,
                                imagePullPolicy: container.imagePullPolicy,
                                resources: container.resources,
                                envFrom: container.envFrom?.map(envFrom => {
                                    if (envFrom.configMapRef) {
                                        dependencies.push(`v1/ConfigMap/default/${envFrom.configMapRef.name}`);
                                    }

                                    if (envFrom.secretRef) {
                                        dependencies.push(`v1/Secret/default/${envFrom.secretRef.name}`);
                                    }

                                    return envFrom;
                                }),
                            })),
                        },
                    },
                },
            });

            dependencies.forEach(dependency => {
                deploymentResource.addDependency(dependency);
            });

            this.addResource(deploymentResource);
        });
    }
}
