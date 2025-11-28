import assert from "assert";
import { describe, it } from "mocha";
import { DummyComponent } from "./dummyComponent.js";
import { APIObject, APIResource, Application, k8s } from "../src/index.js";

class DummyApplication extends Application {
    constructor() {
        super('ApplicationName');
    }

    async build(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

describe("Application tests", () => {

    it("Expect addResource to add resource", () => {
        // Arrange
        const application = new DummyApplication();
        const component = new DummyComponent("CustomName");
        application.addComponent(component);
        const resource = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });
        // Act
        component.addResource(resource);
        // Assert
        const resources = application.getResources();
        assert.strictEqual(resources.length, 1);
        assert.strictEqual(resources[0], resource);
        assert.strictEqual(resources[0].getComponent(), component);
    });

    it("Expect getResources to return all resources", () => {
        // Arrange
        const application = new DummyApplication();
        const component = new DummyComponent("CustomName");
        application.addComponent(component);
        const resource1 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test1",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });
        const resource2 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test2",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });
        component.addResource(resource1);
        component.addResource(resource2);
        // Act
        const resources = application.getResources();
        // Assert
        assert.strictEqual(resources.length, 2);
        assert.strictEqual(resources[0], resource1);
        assert.strictEqual(resources[1], resource2);
    });

    it("Expect getResources to filter resources", () => {
        // Arrange
        const application = new DummyApplication();
        const component = new DummyComponent("CustomName");
        application.addComponent(component);
        const resource1 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test1",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });
        const resource2 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test2",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });
        component.addResource(resource1);
        component.addResource(resource2);
        // Act
        const resources = application.getResources(
            (resource: APIObject) => resource.getName() === "test1"
        );
        // Assert
        assert.strictEqual(resources.length, 1);
        assert.strictEqual(resources[0].getName(), "test1");
    });

    it("Expect getResources to return empty array if no resources", () => {
        // Arrange
        const application = new DummyApplication();
        // Act
        const resources = application.getSortedResources();
        // Assert
        assert.strictEqual(resources.length, 0);
    });

    it("Expect getResources to return empty array if no resources after filter", () => {
        // Arrange
        const application = new DummyApplication();
        const component = new DummyComponent("CustomName");
        application.addComponent(component);
        const resource1 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test1",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });
        const resource2 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test2",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });
        component.addResource(resource1);
        component.addResource(resource2);
        // Act
        const resources = application.getResources(resource => resource.getIdentifier() === "test3");
        // Assert
        assert.strictEqual(resources.length, 0);
    });

    it("Expect array to be immutable", () => {
        // Arrange
        const application = new DummyApplication();
        const component = new DummyComponent("CustomName");
        application.addComponent(component);
        const resource = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });
        component.addResource(resource);
        // Act
        const resources = application.getResources();
        resources.pop();
        // Assert
        assert.strictEqual(application.getResources().length, 1);
    });

    it("Expect getSortedResources to return resources in order when dependencies are present", () => {
        // Arrange
        const application = new DummyApplication();
        const component = new DummyComponent("CustomName");
        application.addComponent(component);

        const resource1 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test1",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });

        resource1.addDependency("v1/ConfigMap/default/test2");

        const resource2 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test2",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });

        const resource3 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test3",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });

        resource3.addDependency("v1/ConfigMap/default/test4");

        const resource4 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test4",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });

        component.addResource(resource1);
        component.addResource(resource2);
        component.addResource(resource3);
        component.addResource(resource4);
        // Act
        const resources = application.getSortedResources();

        console.log(JSON.stringify(resources, null, 2));
        // Assert
        assert.strictEqual(resources.length, 4);
        assert.strictEqual(resources[0], resource2);
        assert.strictEqual(resources[1], resource1);
        assert.strictEqual(resources[2], resource4);
        assert.strictEqual(resources[3], resource3);
    });

    it("Expect setNamespace to set namespace for namespaced resources without namespace", () => {
        // Arrange
        const application = new DummyApplication();
        const component = new DummyComponent("CustomName");
        application.addComponent(component);

        const resource1 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test1",
                //@ts-ignore
                namespace: undefined,
            },
            data: {
                key: "value",
            },
        });

        const resource2 = new k8s.core.v1.Namespace({
            metadata: {
                name: "custom-namespace",
            },
        });

        component.addResource(resource1);
        component.addResource(resource2);
        component.setNamespace("new-namespace");
        const resources = application.getSortedResources();
        // Assert
        assert.strictEqual(resources.length, 2);
        
        const configMap = resources.find(r => r.getKind() === "ConfigMap");
        // @ts-ignore
        assert.strictEqual(configMap?.metadata.namespace, "new-namespace");

        const namespace = resources.find(r => r.getKind() === "Namespace");
        // @ts-ignore
        assert.strictEqual(namespace?.metadata.namespace, undefined);
    });

    it("Expect setNamespace to update dependencies when namespace is set", () => {
        // Arrange
        const application = new DummyApplication();
        const component = new DummyComponent("CustomName");
        application.addComponent(component);

        const resource = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test1",
                //@ts-ignore
                namespace: undefined,
            },
            data: {
                key: "value",
            },
        });

        resource.addDependency("v1/ConfigMap/default/test2");

        const resource2 = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test2",
                //@ts-ignore
                namespace: undefined,
            },
            data: {
                key: "value",
            },
        });

        component.addResource(resource);
        component.addResource(resource2);
        // Act
        component.setNamespace("custom-namespace");
        const resources = application.getSortedResources();
        // Assert
        console.log(JSON.stringify(resources, null, 2));

        assert.strictEqual(resources.length, 2);
        assert.strictEqual(resources[0], resource2);
        assert.strictEqual(resources[1], resource);
    });
});
