import { Application } from "@kubeframe/kubeframe-version";
import { MyComponent } from "./component.js";

export class MyApplication extends Application {

    constructor() {
        super(MyApplication.name);
    }

    async build(): Promise<void> {
        this.addComponent(new MyComponent());
    }
}