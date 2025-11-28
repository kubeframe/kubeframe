import { Application } from '@kubeframe/kubeframe-version';
import { Configuration } from './configuration.js';
import { MyComponent } from './component.js';

export class MyApplication extends Application {

    private configuration: Configuration;

    constructor(configFile: string) {
        super(MyApplication.name);
        this.configuration = Configuration.load(configFile);
    }

    async build() {
        this.addComponent(new MyComponent(this.configuration));
    }
}
