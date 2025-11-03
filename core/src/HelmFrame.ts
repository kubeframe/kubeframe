import { execSync } from "child_process";
import { Frame } from "./Frame.js";
import { ResourceCollector } from "./ResourceCollector.js";
import { APIResourceFactory } from "./base/APIResourceFactory.js";
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

    constructor(name: string, private options: HelmOptions) {
        super(name);
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
                frame: this,
            }, resource);
        }
    }

    async doPostBuild() { }
}
