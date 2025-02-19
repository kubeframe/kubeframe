
import { ResourceCollector } from '@kubeframe/core/resourceCollector.js';
import { YAMLExporter } from '@kubeframe/core/yamlExporter.js';
import { ApplicationFrame } from "./application.js";

async function run() {
    
    const applicationFrame = new ApplicationFrame();
    
    const resourceCollector = new ResourceCollector();
    await applicationFrame.build(resourceCollector);
    
    const yamlExporter = new YAMLExporter(resourceCollector);
    const yaml = yamlExporter.export();

    console.log(yaml);
}

run();
