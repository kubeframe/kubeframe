import { ConfigMap } from '@kubeframe/k8s/core/v1/ConfigMap.js';
import { Frame } from '@kubeframe/core/frame.js';
import { ResourceCollector } from '@kubeframe/core/resourceCollector.js';
import { YAMLExporter } from '@kubeframe/core/yamlExporter.js';

export class ApplicationFrame extends Frame {
    constructor() {
        super();
        console.log('ApplicationFrame constructor');
    }

    async doPreBuild() {
        console.log('ApplicationFrame doPreBuild');
    }

    async doBuild(resourceCollector: ResourceCollector) {
        const configMap = new ConfigMap({
            metadata: {
                name: 'my-configmap',
                namespace: 'default',
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

    async doPostBuild() {
        console.log('ApplicationFrame doPostBuild');
    }
}

async function run() {
    
    const applicationFrame = new ApplicationFrame();
    
    const resourceCollector = new ResourceCollector();
    await applicationFrame.build(resourceCollector);
    
    const yamlExporter = new YAMLExporter(resourceCollector);
    const yaml = yamlExporter.export();

    console.log(yaml);
}

run();
