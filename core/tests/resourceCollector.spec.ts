import assert from "assert";
import { ResourceCollector } from "../src/resourceCollector.js";
import { DummyFrame } from "./dummyFrame.js";
import { k8s } from "@kubeframe/k8s";

describe("ResourceCollector tests", () => {

    it("Expect addResource to add resource", () => {
        // Arrange
        const collector = new ResourceCollector();
        const frame = new DummyFrame();
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
        collector.addResource({ frame }, resource);
        // Assert
        const resources = collector.getResources();
        assert.strictEqual(resources.length, 1);
        assert.strictEqual(resources[0].resource, resource);
        assert.strictEqual(resources[0].sourceInfo.frame, frame);
    });

    it("Expect getResources to return all resources", () => {
        // Arrange
        const collector = new ResourceCollector();
        const frame = new DummyFrame();
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
        collector.addResource({ frame }, resource1);
        collector.addResource({ frame }, resource2);
        // Act
        const resources = collector.getResources();
        // Assert
        assert.strictEqual(resources.length, 2);
        assert.strictEqual(resources[0].resource, resource1);
        assert.strictEqual(resources[1].resource, resource2);
    });

    it("Expect getResources to filter resources", () => {
        // Arrange
        const collector = new ResourceCollector();
        const frame = new DummyFrame();
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
        collector.addResource({ frame }, resource1);
        collector.addResource({ frame }, resource2);
        // Act
        const resources = collector.getResources(resource => resource.resource.metadata.name === "test1");
        // Assert
        assert.strictEqual(resources.length, 1);
        assert.strictEqual(resources[0].resource, resource1);
    });

    it("Expect getResources to return empty array if no resources", () => {
        // Arrange
        const collector = new ResourceCollector();
        // Act
        const resources = collector.getResources();
        // Assert
        assert.strictEqual(resources.length, 0);
    });

    it("Expect getResources to return empty array if no resources after filter", () => {
        // Arrange
        const collector = new ResourceCollector();
        const frame = new DummyFrame();
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
        collector.addResource({ frame }, resource1);
        collector.addResource({ frame }, resource2);
        // Act
        const resources = collector.getResources(resource => resource.resource.metadata.name === "test3");
        // Assert
        assert.strictEqual(resources.length, 0);
    });

    it("Expect array to be immutable", () => {
        // Arrange
        const collector = new ResourceCollector();
        const frame = new DummyFrame();
        const resource = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test",
                namespace: "default",
            },
            data: {
                key: "value",
            },
        });
        collector.addResource({ frame }, resource);
        // Act
        const resources = collector.getResources();
        resources.pop();
        // Assert
        assert.strictEqual(collector.getResources().length, 1);
    });
});
