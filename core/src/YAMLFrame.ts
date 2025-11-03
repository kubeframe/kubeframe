import { readFileSync } from "fs";
import { Frame } from "./Frame.js";
import * as YAML from 'yaml';
import { APIResourceFactory } from "./base/APIResourceFactory.js";
import { ResourceCollector } from "./ResourceCollector.js";

export class YAMLFrame extends Frame {

    private source: string;

    constructor(name: string, yamlOrPath: string, isPath: boolean) {
        super(name);
        
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
                frame: this,
            }, resource);
        });
    }

    async doPostBuild() { }
}
