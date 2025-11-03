import { writeFileSync } from "fs";
import { CollectedResource, ResourceCollector, ResourceFilter } from "./ResourceCollector.js";
import { resourceToYaml } from "./YAML.js";

export class YAMLExporter {
    
    constructor(private resourceCollector: ResourceCollector) {}

    export(filter?: ResourceFilter): string {
        const resources = this.resourceCollector.getResources();
        const yaml = resources
            .filter(filter || (() => true))
            .map(resource => {
                return [
                    this.printDocumentHeader(resource),
                    resourceToYaml(resource.resource),
                ].join("\n");
            })
            .join("---\n");

        return yaml;
    }

    exportToFile(filePath: string, filter?: ResourceFilter) {
        const yaml = this.export(filter);
        writeFileSync(filePath, yaml);
    }

    private printDocumentHeader(resource: CollectedResource) {
        return [
            "# SOURCE: " + resource.sourceInfo.frame.getName(),
        ].join("\n");
    }
}
