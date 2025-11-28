import { Component, k8s } from "@kubeframe/kubeframe-version";
import { Configuration } from "./configuration.js";

export class MyComponent extends Component {

    constructor(configuration: Configuration) {
        super(MyComponent.name);
    }

    async build(): Promise<void> {

        const myConfigMap = new k8s.core.v1.ConfigMap({
            metadata: {
                name: 'my-configmap-v2',
                annotations: {
                    'annotation1': 'value1',
                    'annotation2': 'value2',
                }
            },
            data: {
                'key1': 'value1',
                'key2': 'value2',
                'key3': 'value3',
                'key4': 'value4',
                'key5': 'value5',
            },
        });

        this.addResource(myConfigMap);

        const echoServerDeployment = new k8s.apps.v1.Deployment({
            metadata: {
                name: 'echo-server-deployment',
            },
            spec: {
                replicas: 1,
                selector: {
                    matchLabels: {
                        app: 'echo-server',
                    },
                },
                template: {
                    metadata: {
                        labels: {
                            app: 'echo-server',
                        },
                    },
                    spec: {
                        containers: [
                            {
                                name: 'echo-server',
                                image: 'k8s.gcr.io/e2e-test-images/echoserver:2.5',
                                imagePullPolicy: 'IfNotPresent',
                                ports: [
                                    {
                                        containerPort: 8080,
                                    },
                                ],
                                resources: {
                                    requests: {
                                        cpu: '50m',
                                        memory: '10Mi',
                                    },
                                    limits: {
                                        cpu: '100m',
                                        memory: '20Mi',
                                    },
                                },
                                envFrom: [
                                    new k8s.core.v1.EnvFromSource({
                                        configMapRef: new k8s.core.v1.ConfigMapEnvSource({
                                            name: 'my-configmap-v2',
                                        }),
                                    }),
                                ],
                            },
                            
                        ],
                    },
                },
            },
        });

        echoServerDeployment.addDependency(myConfigMap.getIdentifier());
        this.addResource(echoServerDeployment);
    }
}
