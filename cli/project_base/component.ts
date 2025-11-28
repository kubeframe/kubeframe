import { k8s, Component } from '@kubeframe/kubeframe-version';

export class MyComponent extends Component {

    constructor() {
        super(MyComponent.name);
    }

    async build(): Promise<void> {
        const configMap = new k8s.core.v1.ConfigMap({
            metadata: {
                name: 'my-configmap',
                namespace: 'default',
                labels: {
                    'app': 'my-app',
                },
                annotations: {
                    'annotation1': 'value1',
                    'annotation2': 'value2',
                }
            },
            data: {
                'key1': 'value1',
                'key2': 'value2',
            }
        });

        this.addResource(configMap);
    }
}