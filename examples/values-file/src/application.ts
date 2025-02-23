import { k8s } from '@kubeframe/k8s';
import { Frame, ResourceCollector } from '@kubeframe/core';
import { Configuration } from './configuration.js';

export class ApplicationFrame extends Frame {

    private configuration: Configuration;

    constructor(configFile: string) {
        super();
        this.configuration = Configuration.load(configFile);
    }

    async doPreBuild() { }

    async doBuild(resourceCollector: ResourceCollector) {
        if (this.configuration.deployments) {
            for (const deployment of this.configuration.deployments) {
                const k8sDeployment = new k8s.apps.v1.Deployment({
                    metadata: {
                        name: deployment.name,
                        namespace: 'default',
                        labels: {
                            'app': deployment.name,
                        },
                    },
                    spec: {
                        selector: {
                            matchLabels: {
                                'app': deployment.name,
                            }
                        },
                        template: {
                            metadata: {
                                labels: {
                                    'app': deployment.name,
                                }
                            },
                            spec: {
                                containers: deployment.containers.map(container => {
                                    return {
                                        name: container.name,
                                        resources: container.resources,
                                    };
                                }),
                            }
                        }
                    }
                });

                resourceCollector.addResource({
                    frameName: 'ApplicationFrame',
                }, k8sDeployment);
            }
        }
    }

    async doPostBuild() { }
}
