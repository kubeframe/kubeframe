import { execSync } from "child_process";
import { APIResourceFactory } from "./base/APIResourceFactory.js";
import * as YAML from 'yaml';
import { Component } from "./Component.js";
import { APIObject } from "./base/APIResource.js";

export interface HelmOptions {
    releaseName: string;
    chart: string;
    options: string[];
}

/**
 * Frame to import Helm charts
 */
export class HelmComponent extends Component {

    constructor(name: string, private options: HelmOptions) {
        super(name);
    }

    async build() {

        // Run helm template
        const buffer = execSync(`helm template ${this.options.releaseName} ${this.options.chart} ${this.options.options.join(' ')}`);
        const output = buffer.toString();

        // Parse the output
        const docs = YAML.parseAllDocuments(output);
        for (const doc of docs) {
            const json = doc.toJSON();
            const resource = APIResourceFactory.createFromPlainJSON(json);
            this.addResource(resource as APIObject);
        }
    }
}
