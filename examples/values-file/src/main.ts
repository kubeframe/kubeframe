import "reflect-metadata";

import { ResourceCollector, YAMLExporter, Validator } from '@kubeframe/kubeframe-version';
import { ApplicationFrame } from "./application.js";

async function run() {
    
    const applicationFrame = new ApplicationFrame('./values.yaml');
    
    const resourceCollector = new ResourceCollector();
    await applicationFrame.build(resourceCollector);

    const validator = new Validator(resourceCollector);
    const validationResults = await validator.validate(false);

    if (validationResults.length > 0) {
        console.error("Validation errors found:");
        for (const result of validationResults) {
            console.error(`- ${result.error}`);
        }
        process.exit(1);
    } else {

        const yamlExporter = new YAMLExporter(resourceCollector);
        const yaml = yamlExporter.export();

        console.log(yaml);
    }
}

run().catch((error) => {
    console.error("Error during execution:", error);
    process.exit(1);
});
