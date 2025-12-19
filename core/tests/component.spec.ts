import assert from "assert";
import { describe, it } from "mocha";
import { Application, COMPONENT_NAME_LABEL, k8s } from "../src/index.js";
import { DummyComponent } from "./dummyComponent.js";

class DummyApplication extends Application {
    constructor() {
        super('ApplicationName');
    }

    async build(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

describe("Component tests", () => {
    
    it("Expect constructor to set name", () => {
        // Arrange
        const component = new DummyComponent("CustomName");
        const application = new DummyApplication();
        application.addComponent(component);
        // Assert
        assert.equal(component.getName(), "CustomName");
    });

    it("Expect application to be set when component is added to application", () => {
        // Arrange
        const component = new DummyComponent("CustomName");
        const application = new DummyApplication();
        application.addComponent(component);
        // Assert
        assert.equal(component.getApplication(), application);
    });

    it("Expect to set component name as a label", () => {
        // Arrange
        const component = new DummyComponent("CustomName");
        const application = new DummyApplication();
        application.addComponent(component);

        const configMap = new k8s.core.v1.ConfigMap({
            metadata: {
                name: "test",
            },
            data: {
                key: 'value'
            }
        });

        component.addResource(configMap);

        // Assert
        const resources = application.getSortedResources();
        assert.equal(resources.length, 1);
        assert.equal(resources[0].getIdentifier(), configMap.getIdentifier());
        assert.equal(resources[0].getLabels()[COMPONENT_NAME_LABEL], "CustomName");
    });

    it("Expect common labels to return copy of labels", () => {
        // Arrange
        const component = new DummyComponent("CustomName");
        const application = new DummyApplication();
        application.addComponent(component);

        component.setCommonLabel("MyLabel", "CustomName");

        // Assert
        const commonLabels = component.getCommonLabels();
        commonLabels["MyLabel"] = "NewName";
        assert.equal(component.getCommonLabels()["MyLabel"], "CustomName");
        assert.equal(component.getCommonLabels()[COMPONENT_NAME_LABEL], "CustomName");
    });

    it("Expect common annotations to return copy of annotations", () => {
        // Arrange
        const component = new DummyComponent("CustomName");
        const application = new DummyApplication();
        application.addComponent(component);

        component.setCommonAnnotation("MyAnnotation", "CustomName");

        const commonAnnotations = component.getCommonAnnotations();
        commonAnnotations["MyAnnotation"] = "NewName";
        // Assert
        assert.equal(component.getCommonAnnotations()["MyAnnotation"], "CustomName");
    });
});
