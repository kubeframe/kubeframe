import { k8s, Application } from '@kubeframe/kubeframe-version';
import { MyComponent } from './component.js';

export class MyApplication extends Application {
    constructor() {
        super();
    }

    async build(): Promise<void> {
        this.addComponent(new MyComponent());
    }
}
