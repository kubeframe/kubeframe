import { Project } from "ts-morph";
import { describe, it } from "mocha";
import { addTopLevelClassConstructor, cleanTypeNameFromImport, createAPITypeSetterMethod, dedentString, extractCleanTypeName, reconstructParameterTypeName, reconstructReturnTypeName, reconstructTypeName, removeImportFromTypeName } from "../src/typescriptHelpers.js";
import { GroupVersionKind } from "../src/kubernetes.js";
import assert from "node:assert";

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

        addTopLevelClassConstructor(modelClass, groupVersionKind, interfaceDeclaration);

        const constructor = modelClass.getConstructors()[0];
        assert(constructor);
        assert.strictEqual(constructor.getParameters().length, 1);
        assert.strictEqual(constructor.getParameters()[0].getText(), "properties: TestKindProperties");

        const statements = constructor.getStatements().map(stmt => stmt.getText());
        console.log(statements);
        assert(statements.includes(`super('testGroup/v1', 'TestKind', properties.metadata);`));
        assert(statements.includes(`\nif (properties.prop1 === undefined) {\n    throw new Error('Property prop1 is required by TestKind');\n} else {\n    this['prop1'] = properties['prop1'];\n}`));
    });

    it("removeImportFromTypeName", () => {
        const typeName = "import(\"/home/.../cli/apiextensions/v1/JSONSchemaProps\").JSONSchemaProps[]";
        const cleanTypeName = cleanTypeNameFromImport(typeName);
        assert.strictEqual(cleanTypeName, "JSONSchemaProps[]");
    });

    it("removeImportFromTypeName", () => {
        const typeName = "{ [key: string]: import(\"/home/tiith/Projects/experiment/kubeframe/cli/apiextensions/v1/JSONSchemaProps\").JSONSchemaProps; };";
        const cleanTypeName = cleanTypeNameFromImport(typeName);
        assert.strictEqual(cleanTypeName, "{ [key: string]: JSONSchemaProps; };");
    });

    it("expect extractCleanTypeName to return APIType from string map", () => {
        const typeName = "{ [key: string]: APIType };";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        assert.strictEqual(isArrayType, false);
        assert.strictEqual(isStringMap, true);
        assert.strictEqual(cleanTypeName, "APIType");
    });

    it("expect extractCleanTypeName to return APIType from string map", () => {
        const typeName = "{ [key: string]: Array<APIType> };";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        assert.strictEqual(isArrayType, true);
        assert.strictEqual(isStringMap, true);
        assert.strictEqual(cleanTypeName, "APIType");
    });

    it("expect extractCleanTypeName to return APIType from array", () => {
        const typeName = "APIType[];";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        assert.strictEqual(isArrayType, true);
        assert.strictEqual(isStringMap, false);
        assert.strictEqual(cleanTypeName, "APIType");
    });

    it("expect extractCleanTypeName to return APIType from array of string map", () => {
        const typeName = "{ [key: string]: APIType[] };";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        assert.strictEqual(isArrayType, true);
        assert.strictEqual(isStringMap, true);
        assert.strictEqual(cleanTypeName, "APIType");
    });

    it("expect extractCleanTypeName to return APIType from array", () => {
        const typeName = "APIType[]";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        assert.strictEqual(isArrayType, true);
        assert.strictEqual(isStringMap, false);
        assert.strictEqual(cleanTypeName, "APIType");
    });

    it("expect extractCleanTypeName to return APIType from array of string map", () => {
        const typeName = "Array<APIType>";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        assert.strictEqual(isArrayType, true);
        assert.strictEqual(isStringMap, false);
        assert.strictEqual(cleanTypeName, "APIType");
    });

    it("expect reconstructTypeName to return APIType[] | APITypeProperties[] from array", () => {
        const typeName = "APIType[]";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        const reconstructedTypeName = reconstructTypeName(isArrayType, isStringMap, true, cleanTypeName);
        assert.strictEqual(reconstructedTypeName, "APIType[] | APITypeProperties[]");
    });

    it("expect reconstructTypeName to return { [key: string]: APIType | APITypeProperties } from string map", () => {
        const typeName = "{ [key: string]: APIType }";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        const reconstructedTypeName = reconstructTypeName(isArrayType, isStringMap, true, cleanTypeName);
        assert.strictEqual(reconstructedTypeName, "{ [key: string]: APIType | APITypeProperties }");
    });

    it("expect reconstructTypeName to return { [key: string]: APIType[] | APITypeProperties[] } from string map of array", () => {
        const typeName = "{ [key: string]: APIType[] }";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        const reconstructedTypeName = reconstructTypeName(isArrayType, isStringMap, true, cleanTypeName);
        assert.strictEqual(reconstructedTypeName, "{ [key: string]: APIType[] | APITypeProperties[] }");
    });

    it("expect reconstructParameterTypeName to return APIType | APITypeProperties | undefined from APIType", () => {
        const typeName = "APIType";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        const reconstructedTypeName = reconstructParameterTypeName(isArrayType, isStringMap, true, false, cleanTypeName);
        assert.strictEqual(reconstructedTypeName, "APIType | APITypeProperties");
    });

    it("expect reconstructParameterTypeName to return APIType | APITypeProperties | undefined from APIType with question token", () => {
        const typeName = "APIType";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        const reconstructedTypeName = reconstructParameterTypeName(isArrayType, isStringMap, true, true, cleanTypeName);
        assert.strictEqual(reconstructedTypeName, "APIType | APITypeProperties | undefined");
    });

    it("expect reconstructReturnTypeName to return APIType from APIType", () => {
        const typeName = "APIType";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        const reconstructedTypeName = reconstructReturnTypeName(isArrayType, isStringMap, cleanTypeName, false);
        assert.strictEqual(reconstructedTypeName, "APIType");
    });

    it("expect reconstructReturnTypeName to return APIType from APIType with question token", () => {
        const typeName = "APIType";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        const reconstructedTypeName = reconstructReturnTypeName(isArrayType, isStringMap, cleanTypeName, true);
        assert.strictEqual(reconstructedTypeName, "APIType | undefined");
    });

    it("expect reconstructReturnTypeName to return APIType[] from APIType[]", () => {
        const typeName = "APIType[]";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        const reconstructedTypeName = reconstructReturnTypeName(isArrayType, isStringMap, cleanTypeName, false);
        assert.strictEqual(reconstructedTypeName, "APIType[]");
    });

    it("expect reconstructReturnTypeName to return APIType[] from APIType[] with question token", () => {
        const typeName = "APIType[]";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        const reconstructedTypeName = reconstructReturnTypeName(isArrayType, isStringMap, cleanTypeName, true);
        assert.strictEqual(reconstructedTypeName, "APIType[] | undefined");
    });

    it("expect reconstructReturnTypeName to return { [key: string]: APIType | APITypeProperties } from { [key: string]: APIType }", () => {
        const typeName = "{ [key: string]: APIType }";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        const reconstructedTypeName = reconstructReturnTypeName(isArrayType, isStringMap, cleanTypeName, false);
        assert.strictEqual(reconstructedTypeName, "{ [key: string]: APIType }");
    });

    it("expect reconstructReturnTypeName to return { [key: string]: APIType | APITypeProperties } from { [key: string]: APIType } with question token", () => {
        const typeName = "{ [key: string]: APIType }";
        const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
        const reconstructedTypeName = reconstructReturnTypeName(isArrayType, isStringMap, cleanTypeName, true);
        assert.strictEqual(reconstructedTypeName, "{ [key: string]: APIType } | undefined");
    });

    it("expect createAPITypeSetterMethod to return the correct code for APIType", () => {
        const name = "apiType";
        const cleanTypeName = "APIType";
        const isArrayType = false;
        const isStringMap = false;
        const isOptional = false;
        const code = createAPITypeSetterMethod(name, cleanTypeName, isArrayType, isStringMap, isOptional);
        assert.strictEqual(code, `\nif (value instanceof ${cleanTypeName}) {\n    this._${name} = value;\n} else {\n    this._${name} = new ${cleanTypeName}(value);\n}`);
    });

    it("expect createAPITypeSetterMethod to return the correct code for APIType[]", () => {
        const name = "apiType";
        const cleanTypeName = "APIType";
        const isArrayType = true;
        const isStringMap = false;
        const isOptional = false;
        const code = createAPITypeSetterMethod(name, cleanTypeName, isArrayType, isStringMap, isOptional);
        assert.strictEqual(code, `\nconst result: ${cleanTypeName}[] = [];\nfor (const item of value) {\n    if (item instanceof ${cleanTypeName}) {\n        result.push(item);\n    } else {\n        result.push(new ${cleanTypeName}(item));\n    }\n}\nthis._${name} = result;`);
    });

    it("expect createAPITypeSetterMethod to return the correct code for { [key: string]: APIType }", () => {
        const name = "apiType";
        const cleanTypeName = "APIType";
        const isArrayType = false;
        const isStringMap = true;
        const isOptional = false;
        const code = createAPITypeSetterMethod(name, cleanTypeName, isArrayType, isStringMap, isOptional);
        assert.strictEqual(code, `\nconst result: { [key: string]: ${cleanTypeName} } = {};\nfor (const [key, item] of Object.entries(value)) {\n    if (item instanceof ${cleanTypeName}) {\n        result[key] = item;\n    } else {\n        result[key] = new ${cleanTypeName}(item);\n    }\n}\nthis._${name} = result;`);
    });
});
