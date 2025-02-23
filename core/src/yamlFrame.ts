import { readFileSync } from "fs";
import { Frame } from "./frame.js";
import * as YAML from 'yaml';
import { APIResourceFactory } from "@kubeframe/k8s";
import { ResourceCollector } from "./resourceCollector.js";

export class YAMLFrame extends Frame {

    private source: string;

    constructor(private name: string, yamlOrPath: string, isPath: boolean) {
        super();
        
        if (isPath) {
            this.source = readFileSync(yamlOrPath, 'utf8');
        } else {
            this.source = yamlOrPath;
        }
    }

    async doPreBuild() { }

    async doBuild(resourceCollector: ResourceCollector) {
        const docs = YAML.parseAllDocuments(this.source);
        docs.forEach(doc => {
            const json = doc.toJSON();
            const resource = APIResourceFactory.createFromPlainJSON(json);
            resourceCollector.addResource({
                frameName: this.name,
            }, resource);
        });
    }

    async doPostBuild() { }
}
