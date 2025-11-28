
import { YAMLExporter } from '@kubeframe/kubeframe-version';
import { MyApplication } from "./application.js";

async function run() {
    
    const application = new MyApplication();
    
    await application.buildAll();
    
    const yamlExporter = new YAMLExporter();
    const yaml = yamlExporter.export(application);

    console.log(yaml);
}

run();
