import { execSync } from "child_process";
import { Frame } from "./frame.js";
import { ResourceCollector } from "./resourceCollector.js";
import { APIResourceFactory } from "@kubeframe/k8s";
import * as YAML from 'yaml';

export interface HelmOptions {
    releaseName: string;
    chart: string;
    options: string[];
}

/**
 * Frame to import Helm charts
 */
export class HelmFrame extends Frame {

    constructor(private name: string, private options: HelmOptions) {
        super();
    }

    async doPreBuild() { }

    async doBuild(resourceCollector: ResourceCollector) {

        // Run helm template
        const buffer = execSync(`helm template ${this.options.releaseName} ${this.options.chart} ${this.options.options.join(' ')}`);
        const output = buffer.toString();

        // Parse the output
        const docs = YAML.parseAllDocuments(output);
        for (const doc of docs) {
            const json = doc.toJSON();
            const resource = APIResourceFactory.createFromPlainJSON(json);
            resourceCollector.addResource({
                frameName: this.name,
            }, resource);
        }
    }

    async doPostBuild() { }
}
