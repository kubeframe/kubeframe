import { APIResource } from "@kubeframe/k8s";
import * as YAML from 'yaml';

export function resourceToYaml(resource: APIResource): string {
    return YAML.stringify(resource, {
        // Must be disabled because it might fold multiline strings without knowing the context
        lineWidth: 0,
    });
}
