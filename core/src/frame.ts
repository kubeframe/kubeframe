import { ResourceCollector } from './resourceCollector.js';

export abstract class Frame {

    subFrames: Frame[] = [];

    private parent: Frame;

    constructor() { }

    async build(resourceCollector: ResourceCollector): Promise<void> {

        await this.doPreBuild(resourceCollector);

        for (const frame of this.subFrames) {
            await frame.doBuild(resourceCollector);
        }

        await this.doBuild(resourceCollector);

        for (const frame of this.subFrames) {
            await frame.doPostBuild(resourceCollector);
        }

        await this.doPostBuild(resourceCollector);
    }

    abstract doPreBuild(resourceCollector: ResourceCollector): Promise<void>;

    abstract doBuild(resourceCollector: ResourceCollector): Promise<void>;

    abstract doPostBuild(resourceCollector: ResourceCollector): Promise<void>;

    getName() {
        return this.constructor.name;
    }

    getParent() {
        return this.parent;
    }

    setParent(frame: Frame) {
        this.parent = frame;
    }

    hasParent() {
        return this.parent !== undefined;
    }

    addSubFrame(frame: Frame) {
        frame.setParent(this);
        this.subFrames.push(frame);
    }

    getSubFrames() {
        return this.subFrames;
    }
}
