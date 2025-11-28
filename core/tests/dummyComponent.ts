import { Component } from "../src/index.js";

export class DummyComponent extends Component {
    
    constructor(name: string) {
        super(name);
    }

    async build(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
