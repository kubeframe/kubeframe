import assert from "assert";
import { describe, it } from "mocha";
import { Application } from "../src/index.js";
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
});
