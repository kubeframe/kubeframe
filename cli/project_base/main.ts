import { ConfigMap } from '@kubeframe/k8s/core/v1/ConfigMap';
import { Frame } from '@kubeframe/core/frame';
import { ResourceCollector } from '@kubeframe/core/resourceCollector';
import { YAMLExporter } from '@kubeframe/core/yamlExporter';

export class ApplicationFrame extends Frame {
    constructor() {
        super();
        console.log('ApplicationFrame constructor');
    }

    async doPreBuild() {
        console.log('ApplicationFrame doPreBuild');
    }

    async doBuild(resourceCollector: ResourceCollector) {
        const configMap = new ConfigMap('my-configmap', {
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
