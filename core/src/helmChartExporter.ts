import * as path from "path";
import { APIResource, NamespacedAPIResource } from "@kubeframe/k8s/base";
import { CollectedResource, ResourceCollector, ResourceFilter } from "./resourceCollector.js";
import { mkdirSync, statSync, writeFileSync } from "fs";
import * as YAML from "yaml";
import { resourceToYaml } from "./yaml.js";
import { YAMLExporter } from "./yamlExporter.js";

export type TemplateNameBulder = (resource: CollectedResource) => string;

function fsFriendlyApiVersion(apiVersion: string): string {
    return apiVersion
        .replace('/', '_')
        .replace('.', '_')
        .toLowerCase();
}

function defaultTemplateNameBuilder(resource: CollectedResource): string {
    // Use double _ (__) as name component delimiter
    // For dots in apiVersion, we use single _ as delimiter
    let fileName = `${fsFriendlyApiVersion(resource.resource.apiVersion)}__${resource.resource.kind.toLowerCase()}`;
    if (isNamespacedAPIResource(resource.resource)) {
        fileName += `__${resource.resource.metadata.namespace}`;
    }

    return fileName + `__${resource.resource.metadata.name}.yaml`;
}

function isNamespacedAPIResource(resource: APIResource): resource is NamespacedAPIResource {
    return resource instanceof NamespacedAPIResource;
}

export interface ChartExportOptions {
    chartName: string;
    version: string;
    description?: string;
    separateFiles: boolean;
    templateNameBuilder?: TemplateNameBulder;
}

export class HelmChartExporter {

    constructor(
        private resourceCollector: ResourceCollector,
        private options: ChartExportOptions,
    ) {}

    export(outputDir: string, resourceFilter?: ResourceFilter) {
        const chartDir = `${outputDir}/${this.options.chartName}`;
        const templatesDir = `${chartDir}/templates`;
        const chart = {
            apiVersion: "v2",
            name: this.options.chartName,
            version: this.options.version,
            description: this.options.description || ""
        };

        // If we create templatesDir, it creates the whole path
        if (!statSync(templatesDir)) {
            mkdirSync(templatesDir, { recursive: true });
        }

        // Save the chart.yaml
        writeFileSync(`${chartDir}/Chart.yaml`, YAML.stringify(chart));

        // Export all resources
        if (this.options.separateFiles) {
            this.exportSeparateFiles(templatesDir, resourceFilter);
        } else {
            this.exportSingleFile(templatesDir, resourceFilter);
        }
    }

    private exportSeparateFiles(templatesDir: string, resourceFilter?: ResourceFilter) {
        for (const resource of this.resourceCollector.getResources(resourceFilter)) {

            const fileName = this.options.templateNameBuilder
                ? this.options.templateNameBuilder(resource)
                : defaultTemplateNameBuilder(resource);
            
            writeFileSync(path.join(templatesDir, fileName), resourceToYaml(resource.resource));
        }
    }

    private exportSingleFile(templatesDir: string, resourceFilter?: ResourceFilter) {
        const yamlExporter = new YAMLExporter(this.resourceCollector);
        const resourcesYaml = yamlExporter.export(resourceFilter);
        writeFileSync(path.join(templatesDir, 'all.yaml'), resourcesYaml);
    }
}
