import assert from "assert";
import { ResourceCollector } from "../src/resourceCollector.js";
import sinon from "sinon";
import { DummyFrame } from "./dummyFrame.js";

describe("Frame tests", () => {
    
    it("Expect constructor to set name", () => {
        // Arrange
        const frame = new DummyFrame("CustomName");
        // Act
        const name = frame.getName();
        // Assert
        assert.equal(name, "CustomName");
    });

    it("Expect name to be class name if not provided", () => {
        // Arrange
        const frame = new DummyFrame();
        // Act
        const name = frame.getName();
        // Assert
        assert.equal(name, "DummyFrame");
    });

    it("Expect parent to be set", () => {
        // Arrange
        const parent = new DummyFrame("Parent");
        const frame = new DummyFrame("Sub");
        // Act
        frame.setParent(parent);
        // Assert
        assert.strictEqual(frame.getParent(), parent);
        assert.strictEqual(frame.hasParent(), true);
        assert.strictEqual(parent.hasParent(), false);
    });

    it("Expect pre/do/post build to be called", async () => {
        // Arrange
        const frame = new DummyFrame();
        const resourceCollector = new ResourceCollector();
        const preBuild = sinon.stub(frame, "doPreBuild");
        const build = sinon.stub(frame, "doBuild");
        const postBuild = sinon.stub(frame, "doPostBuild");
        // Act
        await frame.build(resourceCollector);
        // Assert
        assert.strictEqual(preBuild.calledOnceWithExactly(resourceCollector), true);
        assert.strictEqual(build.calledOnceWithExactly(resourceCollector), true);
        assert.strictEqual(postBuild.calledOnceWithExactly(resourceCollector), true);
    });

    it("Expect subframes to be built", async () => {
        // Arrange
        const parent = new DummyFrame();
        const sub1 = new DummyFrame();
        const sub2 = new DummyFrame();
        parent.addSubFrame(sub1);
        parent.addSubFrame(sub2);
        const resourceCollector = new ResourceCollector();

        function buildStub(frame: DummyFrame) {
            return [
                sinon.stub(frame, "doPreBuild"),
                sinon.stub(frame, "doBuild"),
                sinon.stub(frame, "doPostBuild"),
            ];
        }

        const [preParent, buildParent, postParent] = buildStub(parent);
        const [preSub1, buildSub1, postSub1] = buildStub(sub1);
        const [preSub2, buildSub2, postSub2] = buildStub(sub2);
        
        // Act
        await parent.build(resourceCollector);
        // Assert
        assert.strictEqual(preParent.calledOnceWithExactly(resourceCollector), true);
        assert.strictEqual(buildParent.calledOnceWithExactly(resourceCollector), true);
        assert.strictEqual(postParent.calledOnceWithExactly(resourceCollector), true);
        
        assert.strictEqual(preSub1.calledOnceWithExactly(resourceCollector), true);
        assert.strictEqual(buildSub1.calledOnceWithExactly(resourceCollector), true);
        assert.strictEqual(postSub1.calledOnceWithExactly(resourceCollector), true);

        assert.strictEqual(preSub2.calledOnceWithExactly(resourceCollector), true);
        assert.strictEqual(buildSub2.calledOnceWithExactly(resourceCollector), true);
        assert.strictEqual(postSub2.calledOnceWithExactly(resourceCollector), true);
    });
});
