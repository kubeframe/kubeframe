import { APIResource } from "./APIResource";

export type FactoryFunction = (json: unknown) => APIResource;

export class APIResourceFactory {

    static mapping = new Map<string,FactoryFunction>([
        
    ]);

    static registerFactories(factories: [string, FactoryFunction][]) {
        for (const [key, value] of factories) {
            if (APIResourceFactory.mapping.has(key)) {
                console.info(`Factory for ${key} already registered, skipping`);
            }

            APIResourceFactory.mapping.set(key, value);
        }
    }

    static createFromPlainJSON(json: any): APIResource {

        const apiVersion = json['apiVersion'];
        const kind = json['kind'];
        const metadata = json['metadata'];

        if (!apiVersion || !kind || !metadata) {
            throw new Error('apiVersion, kind and metadata must be set in JSON object', json);
        }

        const factory = APIResourceFactory.mapping.get(`${apiVersion}/${kind}`);
        if (!factory) {
            throw new Error(`No factory found for APIResource ${apiVersion}/${kind}`);
        }

        return factory(json);
    }
}
