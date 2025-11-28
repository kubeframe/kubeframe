import "reflect-metadata";

import { APIResourceFactory } from "../src/base/APIResourceFactory.js";
import assert from "assert";
import { describe, it } from "mocha";
import * as k8s from "../src/generated/k8s.js";

describe("APIResourceFactory", () => {
    it("should create an APIResource from a JSON object", () => {
        // Arrange
        const json = {
            apiVersion: "apps/v1",
            kind: "Deployment",
            metadata: {
                name: "test",
            },
            spec: {
                replicas: 1,
                selector: {
                    matchLabels: {
                        app: "test",
                    }
                },
                template: {
                    metadata: {
                        labels: {
                            app: "test",
                        }
                    },
                    spec: {
                        restartPolicy: "Always",
                        containers: [
                            {
                                image: "test",
                                name: "test",
                            }
                        ]
                    }
                }
            },
        };

        // Act
        const resource = APIResourceFactory.createFromPlainJSON(json);
        console.log(resource);
        // Assert
        assert.ok(k8s.apps.v1.Deployment.is(resource));
    });

    it("should create an APIResource from a JSON object with a spec", () => {

        // Arrange
        const deployment = new k8s.apps.v1.Deployment({
            metadata: {
                name: "test",
            },
            spec: {
                replicas: 1,
                selector: {
                    matchLabels: {
                        app: "test",
                    }
                },
                template: {
                    metadata: {
                        labels: {
                            app: "test",
                        }
                    },
                    spec: {
                        restartPolicy: "Always",
                        containers: [
                            {
                                image: "test",
                                name: "test",
                                env: [
                                    new k8s.core.v1.EnvVar({
                                        name: "TEST",
                                        value: "test",
                                    })
                                ]
                            },
                        ],
                    },
                },
            },
        });

        assert.strictEqual(deployment.spec?.replicas, 1);

        console.log(JSON.stringify(deployment, null, 2));
    });
});