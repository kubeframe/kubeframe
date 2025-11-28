import { Application } from "../src/Application";

export class DummyApplication extends Application {
    constructor() {
        super('ApplicationName');
    }

    async build(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
