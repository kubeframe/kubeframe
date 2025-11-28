import { registerCRDs } from './crds/index.js';
import { MyApplication } from "./application.js";
import { YAMLExporter } from '@kubeframe/kubeframe-version';

registerCRDs();

async function run() {
    
    const application = new MyApplication();
    
    await application.buildAll();
    
    const yamlExporter = new YAMLExporter();
    const yaml = yamlExporter.export(application);

    console.log(yaml);
}

run();
