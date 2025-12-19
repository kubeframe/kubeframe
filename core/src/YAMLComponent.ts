import { readFileSync } from "fs";
import * as YAML from 'yaml';
import { APIResourceFactory } from "./base/APIResourceFactory.js";
import { Component } from "./Component.js";
import { APIObject } from "./base/APIObject.js";

export class YAMLComponent extends Component {

    private source: string;

    constructor(name: string, yamlOrPath: string, isPath: boolean) {
        super(name);
        
        if (isPath) {
            this.source = readFileSync(yamlOrPath, 'utf8');
        } else {
            this.source = yamlOrPath;
        }
    }

    async build() {
        const docs = YAML.parseAllDocuments(this.source);
        docs.forEach(doc => {
            const json = doc.toJSON();
            const resource = APIResourceFactory.createFromPlainJSON(json);
            this.addResource(resource as APIObject);
        });
    }
}
