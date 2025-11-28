import { writeFileSync } from "fs";
import { resourceToYaml } from "./YAML.js";
import { Application, ResourceFilter } from "./Application.js";
import { APIObject } from "./base/APIResource.js";

export class YAMLExporter {
    
    constructor() {}

    export(application: Application, filter?: ResourceFilter): string {
        
        const resources = application.getSortedResources(filter);

        const yaml = resources
            .map(resource => {
                return [
                    this.printDocumentHeader(resource),
                    resourceToYaml(resource),
                ].join("\n");
            })
            .join("---\n");

        return yaml;
    }

    exportToFile(filePath: string, application: Application, filter?: ResourceFilter) {
        const yaml = this.export(application, filter);
        writeFileSync(filePath, yaml);
    }

    private printDocumentHeader(resource: APIObject) {
        return [
            "# Application: " + resource.getComponent().getApplication().getName(),
            "# Component: " + resource.getComponent().getName(),
        ].join("\n");
    }
}
