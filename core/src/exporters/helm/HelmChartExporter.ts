import * as path from "path";
import { APIObject, isNamespacedAPIObject } from "../../base/APIResource.js";
import { mkdirSync, statSync, writeFileSync } from "fs";
import * as YAML from "yaml";
import { resourceToYaml } from "../../YAML.js";
import { YAMLExporter } from "../../YAMLExporter.js";
import { Application } from "../../Application.js";

export type TemplateNameBulder = (resource: APIObject) => string;

function fsFriendlyApiVersion(apiVersion: string): string {
    return apiVersion
        .replace('/', '_')
        .replace('.', '_')
        .toLowerCase();
}

function defaultTemplateNameBuilder(resource: APIObject): string {
    // Use double _ (__) as name component delimiter
    // For dots in apiVersion, we use single _ as delimiter
    let fileName = `${fsFriendlyApiVersion(resource.apiVersion)}__${resource.kind.toLowerCase()}`;
    if (isNamespacedAPIObject(resource)) {
        fileName += `__${resource.metadata.namespace}`;
    }

    return fileName + `__${resource.metadata.name}.yaml`;
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
        private application: Application,
        private options: ChartExportOptions,
    ) {}

    export(outputDir: string) {
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
            this.exportSeparateFiles(templatesDir);
        } else {
            this.exportSingleFile(templatesDir);
        }
    }

    private exportSeparateFiles(templatesDir: string) {
        for (const resource of this.application.getResources()) {

            const fileName = this.options.templateNameBuilder
                ? this.options.templateNameBuilder(resource)
                : defaultTemplateNameBuilder(resource);

            writeFileSync(path.join(templatesDir, fileName), resourceToYaml(resource));
        }
    }

    private exportSingleFile(templatesDir: string) {
        const yamlExporter = new YAMLExporter();
        const resourcesYaml = yamlExporter.export(this.application);
        writeFileSync(path.join(templatesDir, 'all.yaml'), resourcesYaml);
    }
}
