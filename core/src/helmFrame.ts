import { execSync } from "child_process";
import { Frame } from "./frame";
import { ResourceCollector } from "./resourceCollector";
import { APIResourceFactory } from "@kubeframe/k8s/base/APIResourceFactory";
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
        console.log('HelmFrame constructor');
    }

    async doPreBuild() {
        console.log('HelmFrame doPreBuild');
    }

    async doBuild(resourceCollector: ResourceCollector) {

        // Run helm template
        const buffer = execSync(`helm template ${this.options.releaseName} ${this.options.chart} ${this.options.options.join(' ')}`);
        const output = buffer.toString();

        const apiFactory = new APIResourceFactory();

        // Parse the output
        const docs = YAML.parseAllDocuments(output);
        for (const doc of docs) {
            const json = doc.toJSON();
            console.log(json);
            const resource = apiFactory.createFromPlainJSON(json);
            resourceCollector.addResource({
                frameName: this.name,
            }, resource);
        }
    }

    async doPostBuild() {
        console.log('HelmFrame doPostBuild');
    }
    
}
