import "reflect-metadata";

import { getLogger, KubernetesExporter } from '@kubeframe/kubeframe-version';
import { MyApplication } from "./application.js";

async function run() {
    
    const application = new MyApplication('./values.yaml');
    
    await application.buildAll();

    const kubernetesExporter = new KubernetesExporter({
        releaseName: 'test-release',
        namespace: 'values-file-example',
        dryRun: true,
        releaseMetadata: {
            'my-key': 'my-value',
            'my-key2': 'my-value2',
        },
    });

    try {
        // Export the application
        await kubernetesExporter.export(application);

        // Rollback the application
        // await kubernetesExporter.rollback();

        // Destroy the application
        // await kubernetesExporter.destroy();

    } catch (error) {
        getLogger().error(error, "Error during export");
        process.exit(1);
    }
}

run();
