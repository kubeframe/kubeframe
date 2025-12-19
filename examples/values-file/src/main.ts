import "reflect-metadata";

import { 
    APIObject,
    getLogger, 
    KubernetesExporter, 
    KubernetesExportHook, 
    PostPatchHookPayload, 
    PrePatchHookPayload, 
    ReleaseExpiredHookPayload,
} from '@kubeframe/kubeframe-version';
import { MyApplication } from "./application.js";
import { Command } from "commander";

const program = new Command();

function parseBoolean(value: string): boolean {
    return value.toLowerCase() === 'true';
}

interface CommonOptions {
    releaseName: string;
    namespace: string;
    dryRun: boolean;
}

interface ExportOptions extends CommonOptions {
    values: string[];
}

program
    .command('export')
    .description('Export the application to Kubernetes')
    .option('-v, --values <file>', 'One or more values files to use', (value: string, previous:string[]) => {
        return previous.concat(value);
    }, [])
    .option('-r, --release-name <name>', 'The name of the release', 'test-release')
    .option('-n, --namespace <namespace>', 'The namespace to use', 'example-namespace')
    .option('-d, --dry-run <dryRun>', 'Whether to dry run the export', parseBoolean, false)
    .action((options: ExportOptions) => {
        exportApplication(options);
    });

program.command('rollback')
    .description('Rollback the application to the previous release')
    .option('-r, --release-name <name>', 'The name of the release', 'test-release')
    .option('-n, --namespace <namespace>', 'The namespace to use', 'example-namespace')
    .option('-d, --dry-run <dryRun>', 'Whether to dry run the rollback', parseBoolean, false)
    .action((options: ExportOptions) => {
        rollbackApplication(options);
    });

program.command('destroy')
    .description('Destroy the application')
    .option('-r, --release-name <name>', 'The name of the release', 'test-release')
    .option('-n, --namespace <namespace>', 'The namespace to use', 'example-namespace')
    .option('-d, --dry-run <dryRun>', 'Whether to dry run the destroy', parseBoolean, false)
    .action((options: ExportOptions) => {
        destroyApplication(options);
    });

program.command('releases')
    .description('List the releases')
    .option('-r, --release-name <name>', 'The name of the release', 'test-release')
    .option('-n, --namespace <namespace>', 'The namespace to use', 'example-namespace')
    .option('-d, --dry-run <dryRun>', 'Whether to dry run the list releases', parseBoolean, false)
    .action((options: ExportOptions) => {
        listReleases(options);
    });

program.parse();

function createApplication(options: ExportOptions) {
    return new MyApplication(options.values[0]);
}

function createKubernetesExporter(options: ExportOptions) {
    const kubernetesExporter = new KubernetesExporter({
        releaseName: options.releaseName,
        namespace: options.namespace,
        dryRun: options.dryRun,
        releaseMetadata: {
            'my-key': 'my-value',
            'my-key2': 'my-value2',
        },
    });

    kubernetesExporter.addExportHook(KubernetesExportHook.RELEASE_EXPIRED, async (event) => {
        if (event instanceof ReleaseExpiredHookPayload) {
            getLogger().info(`${event.state.configMap.getName()} release expired`);
        }
    });

    kubernetesExporter.addExportHook(KubernetesExportHook.PRE_PATCH, async (event) => {
        if (event instanceof PrePatchHookPayload) {
            if (event.resource instanceof APIObject) {
                getLogger().info(`${event.resource.getIdentifier()} pre-patched`);
            }
        }
    });

    kubernetesExporter.addExportHook(KubernetesExportHook.POST_PATCH, async (event) => {
        if (event instanceof PostPatchHookPayload) {
            if (event.resource instanceof APIObject) {
                getLogger().info(`${event.resource.getIdentifier()} patched`);
            }
        }
    });

    return kubernetesExporter;
}

async function exportApplication(options: ExportOptions) {
    
    const application = createApplication(options);
    
    await application.buildAll();

    const kubernetesExporter = createKubernetesExporter(options);

    try {
        // Export the application
        await kubernetesExporter.export(application);
    } catch (error) {
        getLogger().error(error, "Error during export");
        process.exit(1);
    }
}

async function rollbackApplication(options: ExportOptions) {

    const kubernetesExporter = createKubernetesExporter(options);

    try {
        await kubernetesExporter.rollback();
    } catch (error) {
        getLogger().error(error, "Error during rollback");
        process.exit(1);
    }
}

async function destroyApplication(options: ExportOptions) {
    const kubernetesExporter = createKubernetesExporter(options);

    try {
        await kubernetesExporter.destroy();
    } catch (error) {
        getLogger().error(error, "Error during destroy");
        process.exit(1);
    }
}

async function listReleases(options: ExportOptions) {
    const kubernetesExporter = createKubernetesExporter(options);

    try {
        const releases = await kubernetesExporter.releases();
        for (const release of releases) {
            console.info(`${release.name}`);
        }
    } catch (error) {
        getLogger().error(error, "Error during list releases");
        process.exit(1);
    }
}
