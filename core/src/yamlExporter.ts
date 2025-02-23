import { writeFileSync } from "fs";
import { ResourceCollector, ResourceFilter } from "./resourceCollector.js";
import { resourceToYaml } from "./yaml.js";
import { KUBEFRAME_KUBERNETES_VERSION } from "@kubeframe/k8s";

export class YAMLExporter {
    
    constructor(private resourceCollector: ResourceCollector) {}

    export(filter?: ResourceFilter): string {
        const resources = this.resourceCollector.getResources();
        const yaml = resources
            .filter(filter || (() => true))
            .map(resource => {
                return `# KUBEFRAME_VERSION: ${KUBEFRAME_KUBERNETES_VERSION}\n# SOURCE: ${resource.sourceInfo.frameName}\n${resourceToYaml(resource.resource)}`;
            })
            .join("---\n");

        return yaml;
    }

    exportToFile(filePath: string, filter?: ResourceFilter) {
        const yaml = this.export(filter);
        writeFileSync(filePath, yaml);
    }
}
