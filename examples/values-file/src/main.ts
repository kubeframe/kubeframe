import "reflect-metadata";

import { 
    getLogger, 
    KubernetesExporter, 
    KubernetesLifecycleEvent, 
    PostPatchEventPayload, 
    PrePatchEventPayload, 
    ReleaseExpiredEventPayload,
} from '@kubeframe/kubeframe-version';
import { MyApplication } from "./application.js";

async function run() {
    
    const application = new MyApplication('./values.yaml');
    
    await application.buildAll();

    const kubernetesExporter = new KubernetesExporter({
        releaseName: 'test-release',
        namespace: 'example-namespace',
        dryRun: false,
        releaseMetadata: {
            'my-key': 'my-value',
            'my-key2': 'my-value2',
        },
        numberOfReleasesToKeep: 2,
    });

    kubernetesExporter.addEventListener(KubernetesLifecycleEvent.RELEASE_EXPIRED, async (event) => {
        if (event instanceof ReleaseExpiredEventPayload) {
            getLogger().info(`${event.configMap.getName()} release expired`);
        }
    });

    kubernetesExporter.addEventListener(KubernetesLifecycleEvent.PRE_PATCH, async (event) => {
        if (event instanceof PrePatchEventPayload) {
            getLogger().info(`${event.existingResource.getIdentifier()} pre-patched`);
        }
    });

    kubernetesExporter.addEventListener(KubernetesLifecycleEvent.POST_PATCH, async (event) => {
        if (event instanceof PostPatchEventPayload) {
            getLogger().info(`${event.response.getIdentifier()} patched`);
        }
    });

    try {

        //const releases = await kubernetesExporter.releases();
        //getLogger().info('Releases', releases);

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
