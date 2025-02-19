import { ConfigMap } from '@kubeframe/k8s/core/v1/ConfigMap.js';
import { Frame } from '@kubeframe/core/frame.js';
import { ResourceCollector } from '@kubeframe/core/resourceCollector.js';

export class ApplicationFrame extends Frame {
    constructor() {
        super();
    }

    async doPreBuild() { }

    async doBuild(resourceCollector: ResourceCollector) {
        const configMap = new ConfigMap({
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
    }

    async doPostBuild() { }
}
