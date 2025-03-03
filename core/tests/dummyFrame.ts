import { Frame } from "../src/frame.js";
import { ResourceCollector } from "../src/resourceCollector.js";

export class DummyFrame extends Frame {
    
    constructor(name?: string) {
        super(name);
    }

    doPreBuild(resourceCollector: ResourceCollector): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    doBuild(resourceCollector: ResourceCollector): Promise<void> {
        throw new Error("Method not implemented.");
    }

    doPostBuild(resourceCollector: ResourceCollector): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
