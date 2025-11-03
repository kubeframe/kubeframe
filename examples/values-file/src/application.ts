import { k8s, Frame, ResourceCollector } from '@kubeframe/kubeframe-version';
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

                const selectorLabels: { [key: string]: string } = {
                    'app': deployment.name,
                };

                const k8sDeployment = new k8s.apps.v1.Deployment({
                    metadata: {
                        name: deployment.name,
                        namespace: 'default',
                        labels: {
                            ...selectorLabels,
                        },
                    },
                    spec: {
                        replicas: deployment.replicas,
                        selector: {
                            matchLabels: {
                                ...selectorLabels,
                            }
                        },
                        template: {
                            metadata: {
                                labels: {
                                    ...selectorLabels,
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
                    frame: this,
                }, k8sDeployment);
            }
        }

        if (this.configuration.services) {
            for (const service of this.configuration.services) {
                const k8sService = new k8s.core.v1.Service({
                    metadata: {
                        name: service.name,
                        namespace: 'default',
                        labels: {
                            'app': service.name,
                        },
                    },
                    spec: {
                        ports: service.ports,
                        selector: service.selector,
                    }
                });

                resourceCollector.addResource({
                    frame: this,
                }, k8sService);
            }
        }
    }

    async doPostBuild() {

    }
}
