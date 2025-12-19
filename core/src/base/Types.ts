export interface APIResourceIdentifierParts {
    apiVersion: string;
    kind: string;
    namespace?: string;
    name: string;
}

export type DependencyKey = string;
