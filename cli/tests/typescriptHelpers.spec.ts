import { Project } from "ts-morph";
import { addClassConstructor } from "../src/typescriptHelpers.js";
import { GroupVersionKind } from "../src/kubernetes.js";
import assert from "assert";

describe("typescriptHelpers", () => {
    it("addClassConstructor", () => {
        const project = new Project();
        const sourceFile = project.createSourceFile("test.ts", `
        export interface TestKindArgs {
            prop1: string;
            metadata: object;
        }
        export class TestKind {
            
        }
        `);

        const modelClass = sourceFile.getClass("TestKind")!;
        const interfaceDeclaration = sourceFile.getInterface("TestKindArgs")!;

        const groupVersionKind: GroupVersionKind = {
            group: "testGroup",
            version: "v1",
            kind: "TestKind"
        };

        addClassConstructor(modelClass, groupVersionKind, interfaceDeclaration);

        const constructor = modelClass.getConstructors()[0];
        assert(constructor);
        assert.strictEqual(constructor.getParameters().length, 1);
        assert.strictEqual(constructor.getParameters()[0].getText(), "args: TestKindArgs");

        const statements = constructor.getStatements().map(stmt => stmt.getText());
        assert(statements.includes(`super('testGroup/v1', 'TestKind', args.metadata);`));
        assert(statements.includes(`this.prop1 = args.prop1;`));
    });
});
