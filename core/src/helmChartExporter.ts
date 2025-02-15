import { CollectedResource, ResourceCollector } from "./resourceCollector";
import { mkdirSync, statSync, writeFileSync } from "fs";
import * as YAML from "yaml";

export type TemplateNameBulder = (resource: CollectedResource) => string;

function defaultTemplateNameBuilder(resource: CollectedResource): string {
    // Use _ because - is a valid character in the name
    return `${resource.sourceInfo.frameName.toLocaleLowerCase()}_${resource.resource.kind.toLowerCase()}_${resource.resource.metadata.name}.yaml`;
}

export interface ChartExportOptions {
    chartName: string;
    version: string;
    description?: string;
    separateFiles: boolean;
}

export class HelmChartExporter {

    constructor(
        private resourceCollector: ResourceCollector,
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
        
    }
}
