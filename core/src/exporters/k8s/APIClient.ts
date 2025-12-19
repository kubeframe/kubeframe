import * as k8sClient from '@kubernetes/client-node';
import { APIObject, APIResource, APIResourceFactory, k8s } from '../../index.js';

type APIObjectHeader<T extends APIObject> = Pick<T, 'apiVersion' | 'kind'> & {
    metadata: {
        name: string;
        namespace?: string;
    };
};

export interface APIClient {
    create(resource: APIObject): Promise<APIResource>;
    patch(resource: APIObject): Promise<APIObject>;
    read(resource: APIObjectHeader<APIObject>): Promise<APIObject>;
    delete(resource: APIObject): Promise<k8s.meta.v1.Status>;
    list(apiVersion: string, kind: string, namespace: string | undefined, labelSelector: string): Promise<APIResource>;
}

export class KubernetesAPIClient implements APIClient {

    private kubeConfig: k8sClient.KubeConfig;
    private apiClient: k8sClient.KubernetesObjectApi;
    private fieldManager: string;

    constructor(fieldManager: string) {
        this.kubeConfig = new k8sClient.KubeConfig();
        this.kubeConfig.loadFromDefault();
        this.apiClient = k8sClient.KubernetesObjectApi.makeApiClient(this.kubeConfig);
    }

    async create(resource: APIObject): Promise<APIObject> {
        const rawResponse = await this.apiClient.create(resource, undefined, undefined, this.fieldManager);
        return APIResourceFactory.createFromPlainJSON(rawResponse) as APIObject;
    }

    async patch(resource: APIObject): Promise<APIObject> {
        const rawResponse = await this.apiClient.patch(resource, undefined, undefined, this.fieldManager, undefined, k8sClient.PatchStrategy.StrategicMergePatch);
        return APIResourceFactory.createFromPlainJSON(rawResponse) as APIObject;
    }

    async read(resource: APIObjectHeader<APIObject>): Promise<APIObject> {
        const rawResponse = await this.apiClient.read(resource);
        return APIResourceFactory.createFromPlainJSON(rawResponse) as APIObject;
    }

    async delete(resource: APIObject): Promise<k8s.meta.v1.Status> {
        const rawResponse = await this.apiClient.delete(resource);
        return APIResourceFactory.createFromPlainJSON(rawResponse) as k8s.meta.v1.Status;
    }

    async list(apiVersion: string, kind: string, namespace: string | undefined, labelSelector: string): Promise<APIResource> {
        const rawResponse = await this.apiClient.list(apiVersion, kind, namespace || undefined, 'true', false, false, undefined, labelSelector);
        return APIResourceFactory.createFromPlainJSON(rawResponse);
    }
}
