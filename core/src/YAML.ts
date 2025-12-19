import { APIObject } from "./base/APIObject.js";
import * as YAML from 'yaml';

export function resourceToYaml(resource: APIObject): string {
    return YAML.stringify(resource, {
        // Must be disabled because it might fold multiline strings without knowing the context
        lineWidth: 0,
    });
}
