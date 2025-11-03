import { k8s, Frame, ResourceCollector, YAMLFrame } from '@kubeframe/kubeframe-version';
import { crds, registerCRDs } from './crds/index.js';

export class ApplicationFrame extends Frame {

    static {
        registerCRDs();
    }

    constructor() {
        super();
        this.addSubFrame(new YAMLFrame('PrometheusRule', './static/static-prometheus-rule.yaml', true));
    }

    async doPreBuild() { }

    async doBuild(resourceCollector: ResourceCollector) {
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

        resourceCollector.addResource({
            frame: this,
        }, configMap);

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

        resourceCollector.addResource({
            frame: this,
        }, sealedSecret);
    }

    async doPostBuild() { }
}
