import * as k8s from '@kubeframe/k8s';
import * as crds from './crds/index.js';
import { registerCRDs } from './crds/CRDFactory.js';
import { Frame, ResourceCollector, YAMLFrame } from '@kubeframe/core';

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
            frameName: 'ApplicationFrame',
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
            frameName: 'ApplicationFrame',
        }, sealedSecret);
    }

    async doPostBuild() { }
}
