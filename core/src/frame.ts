import { ResourceCollector } from './resourceCollector.js';

export abstract class Frame {

    private name: string;

    private subFrames: Frame[] = [];

    private parent: Frame;

    constructor(name?: string) {
        if (!name) {
            this.name = this.constructor.name;
        } else {
            this.name = name;
        }
    }

    async build(resourceCollector: ResourceCollector): Promise<void> {

        await this.doPreBuild(resourceCollector);

        for (const frame of this.subFrames) {
            await frame.doPreBuild(resourceCollector);
        }

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
        return this.name;
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
