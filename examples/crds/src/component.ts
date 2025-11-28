import { k8s, Component } from '@kubeframe/kubeframe-version';
import { crds } from './crds/index.js';

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

        const sealedSecret = new crds.bitnami.com.v1alpha1.SealedSecret({
            metadata: {
                name: 'my-sealed-secret',
                namespace: 'default',
            },
            spec: {
                encryptedData: {
                    'key1': 'encryptedValue1',
                    'key2': 'encryptedValue2',
                }
            }
        });

        this.addResource(sealedSecret);
    }
}
