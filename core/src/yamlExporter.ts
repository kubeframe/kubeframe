import { writeFileSync } from "fs";
import { CollectedResource, ResourceCollector, ResourceFilter } from "./resourceCollector.js";
import { resourceToYaml } from "./yaml.js";
import { KUBEFRAME_KUBERNETES_VERSION } from "@kubeframe/k8s";

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
            "# KUBEFRAME_KUBERNETES_VERSION: " + KUBEFRAME_KUBERNETES_VERSION,
            "# SOURCE: " + resource.sourceInfo.frame.getName(),
        ].join("\n");
    }
}
