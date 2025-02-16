import { writeFileSync } from "fs";
import { CollectedResource, ResourceCollector } from "./resourceCollector.js";
import { resourceToYaml } from "./yaml.js";
// import { KUBEFRAME_VERSION } from "@kubeframe/k8s/version";

export type ResourceFilter = (resource: CollectedResource) => boolean;

export class YAMLExporter {
    
    constructor(private resourceCollector: ResourceCollector) {}

    export(filter?: ResourceFilter): string {
        const resources = this.resourceCollector.getResources();
        const yaml = resources
            .filter(filter || (() => true))
            .map(resource => {
                return `# KUBEFRAME_VERSION: TEST\n# SOURCE: ${resource.sourceInfo.frameName}\n${resourceToYaml(resource.resource)}`;
            })
            .join("---\n");

        return yaml;
    }

    exportToFile(filePath: string, filter?: ResourceFilter) {
        const yaml = this.export(filter);
        writeFileSync(filePath, yaml);
    }
}
