import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { ClassDeclaration, InterfaceDeclaration, Project, PropertyDeclaration, SourceFile } from "ts-morph";
import { GroupVersionKind, groupVersionToString } from "./kubernetes.js";
import { formatComment } from "./util.js";

export function comparePropertyName(a: string, b: string) {
    return a === b || a === `'${b}'` || a === `"${b}"`;
}

export function convertClassToInterface(sourceFile: SourceFile, className: string, interfaceName: string) { }

export function convertInterfaceToClass(sourceFile: SourceFile, interfaceName: string, className: string) {
    const interfaceDeclaration = sourceFile.getInterface(interfaceName);

    if (!interfaceDeclaration) {
        console.error(`Interface ${interfaceName} not found`);
        return;
    }

    return sourceFile.insertClass(interfaceDeclaration.getChildIndex() + 1, {
        name: className,
        isExported: true,
        properties: interfaceDeclaration.getProperties().map(p => ({
            name: p.getName(),
            type: p.getType().getText(),
            hasQuestionToken: p.hasQuestionToken(),
        })),
    });
}

export function removeUnnecessaryQuotesFromPropertyName(name: string): string {

    if (!name.startsWith(`'`) && !name.startsWith(`"`)) {
        return name;
    }

    const withoutQuotes = name.replace(/['"]+/g, '');

    // Valid identifiers in JS/TS: Must start with a letter, $, or _, followed by letters, numbers, $, or _
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(withoutQuotes)) {
        return withoutQuotes; // No quotes needed
    }

    console.log(`Unable to remove quotes from property name: ${name}`);
    return `'${withoutQuotes}'`; // Keep quotes if it's not a valid identifier
}

export function addToIndexImportTree(moduleName: string, outpurDir: string, importTree: string[]) {
    let parentName = moduleName;
    let parentPath = outpurDir;
    for (let i = 0; i < importTree.length; i++) {
        const project = new Project();

        const isRoot = i === 0;
        const sourcePath = path.join(parentPath, isRoot ? `${moduleName}.ts` : "index.ts");
        const fileExists = existsSync(sourcePath);
        const source = project.createSourceFile(parentPath, fileExists ? readFileSync(sourcePath, 'utf8') : '');

        const isLast = i === importTree.length - 1;

        if (isLast) {

            const moduleSpecifier = `./${importTree[i]}.js`;
            const hasImport = source.getExportDeclarations().find(id => id.getModuleSpecifierValue() === moduleSpecifier);

            if (!hasImport) {
                source.addExportDeclaration({
                    moduleSpecifier
                });
            }

        } else {
            const moduleSpecifier = `./${importTree[i]}/index.js`;
            const hasImport = source.getImportDeclarations().find(id => id.getModuleSpecifierValue() === moduleSpecifier);
        
            if (!hasImport) {
                source.addImportDeclaration({
                    moduleSpecifier: `./${importTree[i]}/index.js`,
                    namespaceImport: importTree[i]
                });

                const exportDeclaration = source.getExportDeclaration(() => true);
                if (!exportDeclaration) {
                    source.addExportDeclaration({
                        namedExports: [importTree[i]]
                    });
                } else {
                    if (!exportDeclaration.getNamedExports().find(ne => ne.getName() === importTree[i])) {
                        exportDeclaration.addNamedExport(importTree[i]);
                    }
                }
            }
        }
        
        writeFileSync(sourcePath, source.getText());
        parentPath = path.join(parentPath, importTree[i]);
        parentName = importTree[i];
    }
}

export function addTopLevelClassConstructor(
    modelClass: ClassDeclaration,
    groupVersionKind: GroupVersionKind,
    interfaceDeclaration: InterfaceDeclaration)
{
    modelClass.addConstructor({
        parameters: [
            {
                name: 'properties',
                type: `${groupVersionKind.kind}Properties`,
                hasQuestionToken: false,
            }
        ],
        statements: [
            `super('${groupVersionToString(groupVersionKind)}', '${groupVersionKind.kind}', properties.metadata);`,
            ...interfaceDeclaration.getProperties().map(p => {
                const name = p.getName();
                // Metadata is inherited from APIResource or NamespacedAPIResource and passed in via constructor
                if (!comparePropertyName(name, 'metadata')) {
                    return propertyAssigmentWithExistenceCheck(groupVersionKind.kind, name, !p.hasQuestionToken());
                } else {
                    return [];
                }
            })
            .flat()
        ],
    });
}

export function addPropertiesClassConstructor(
    modelClass: ClassDeclaration,
    interfaceDeclaration: InterfaceDeclaration)
{
    const className = modelClass.getName();
    if (!className) {
        console.error(`Class ${modelClass.getName()} does not have a name`);
        return;
    }

    modelClass.addConstructor({
        parameters: [
            {
                name: 'properties',
                type: `${className}Properties`,
                hasQuestionToken: false,
            }
        ],
        statements: [
            interfaceDeclaration.getProperties().map(p => {
                const name = p.getName();
                // Metadata is inherited from APIResource or NamespacedAPIResource and passed in via constructor
                if (!comparePropertyName(name, 'metadata')) {
                    return propertyAssigmentWithExistenceCheck(className, name, !p.hasQuestionToken());
                } else {
                    return undefined;
                }
            })
            .filter(statement => statement !== undefined)
            .join('\n'),
        ]
    });
}

export function propertyAssigmentWithExistenceCheck(typeName: string, propertyName: string, isRequired: boolean): string {

    if (isRequired) {
        return dedentString(`
            if (properties.${propertyName} === undefined) {
                throw new Error('Property ${propertyName} is required by ${typeName}');
            } else {
                this['${propertyName}'] = properties['${propertyName}'];
            }
        `, 4);
    } else {
        return dedentString(`
            this['${propertyName}'] = properties['${propertyName}'];
        `, 4);
    }
}

/**
 * Adds a method to the model class that checks if the object is that specific type
 * 
 * Example:
 * static is(instance: any): instance is DaemonSet {
 *     return instance instanceof DaemonSet;
 * }
 * 
 * @param modelClass ClassDeclaration to add the method to
 */
export function addTypeCheckIsMethod(modelClass: ClassDeclaration) {
    modelClass.addMethod({
        name: 'is',
        isStatic: true,
        parameters: [
            {
                name: 'instance',
                type: 'any',
            }
        ],
        returnType: `instance is ${modelClass.getName()}`,
        statements: [
            `return instance instanceof ${modelClass.getName()};`
        ]
    });
}

export function addToJSONMethod(
    modelClass: ClassDeclaration,
    interfaceDeclaration: InterfaceDeclaration,
) {
    modelClass.addMethod({
        name: 'toJSON',
        isStatic: false,
        returnType: 'any',
        statements: [
            `return {`,
            interfaceDeclaration.getProperties().map(p => {
                const name = p.getName();
                if (!comparePropertyName(name, 'metadata')) {
                    if (name.includes(`'`)) {
                        return `  ${name}: this[${name}],`;
                    } else {
                        return `  ${name}: this.${name},`;
                    }
                }
            })
            .filter(statement => statement)
            .join('\n'),
            `}`
        ]
    });
}

export function removePropertiesFromClass(modelClass: ClassDeclaration, propertyNames: string[]) {

    if (propertyNames.length === 0) {
        return;
    }

    const propertiesNotSeen = new Set<string>(propertyNames);
    modelClass.getProperties().forEach(p => {
        const nameWithoutQuotes = removeUnnecessaryQuotesFromPropertyName(p.getName());
        if (propertiesNotSeen.has(nameWithoutQuotes)) {
            propertiesNotSeen.delete(nameWithoutQuotes);
            p.remove();
        }
    });
}

export function createInterfaceWithProperties(
    sourceFile: SourceFile,
    interfaceName: string,
    position: number,
    properties: PropertyDeclaration[],
    apiTypes: Set<string>,
) {
    const propertiesInterface = sourceFile.insertInterface(position, {
        name: interfaceName,
        properties: properties.map(p => {

            const typeName = cleanTypeNameFromImport(p.getType().getText());

            const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
            const isAPIType = apiTypes.has(cleanTypeName);

            const type = reconstructTypeName(isArrayType, isStringMap, isAPIType, cleanTypeName);

            return {
                name: removeUnnecessaryQuotesFromPropertyName(p.getName()),
                type: type,
                hasQuestionToken: p.hasQuestionToken(),
                isReadonly: p.isReadonly(),
                docs: p.getJsDocs().map(d => formatComment(d.getInnerText())),
            };
        }).filter(p => p !== undefined),
    })
    .setIsExported(true);

    return propertiesInterface;
}

export function cleanTypeNameFromImport(typeName: string): string {
    const cleaned = typeName.replace(/import\([^)]*\)\./g, '');
    return cleaned;
}

export function extractCleanTypeName(typeName: string): { isArrayType: boolean, isStringMap: boolean, cleanTypeName: string } {
    const withoutSpaces = typeName.replace(/\s/g, '');

    // Match string map like: {[*: string]:*} and capture the type name
    const match = withoutSpaces.match(/{\[\w+:\s*\w+\]\s*:\s*([^\}]+)}/);
    if (match) {
        console.log(`String map: ${match[1]}`);
        const {isArrayType, cleanTypeName} = extractCleanTypeNameFromArray(match[1]);
        return { isArrayType: isArrayType, isStringMap: true, cleanTypeName: cleanTypeName };
    } else {
        const { isArrayType, cleanTypeName } = extractCleanTypeNameFromArray(withoutSpaces);
        return { isArrayType: isArrayType, isStringMap: false, cleanTypeName: cleanTypeName };
    }
}

function extractCleanTypeNameFromArray(typeName: string): { isArrayType: boolean, cleanTypeName: string } {
    if (typeName.startsWith('Array<')) {
        // Get contents between < and >
        const cleanTypeName = typeName.slice(6, typeName.indexOf('>'));
        return { isArrayType: true, cleanTypeName: cleanTypeName };
    } else if (typeName.includes('[]')) {
        // Get contents before []
        return { isArrayType: true, cleanTypeName: typeName.slice(0, typeName.indexOf('[')) };
    } else {
        return { isArrayType: false, cleanTypeName: typeName };
    }
}

export function reconstructParameterTypeName(
    isArrayType: boolean,
    isStringMap: boolean,
    isAPIType: boolean,
    isOptional: boolean,
    cleanTypeName: string,
) {
    const type = reconstructTypeName(isArrayType, isStringMap, isAPIType, cleanTypeName);
    
    if (isOptional) {
        return `${type} | undefined`;
    } else {
        return type;
    }
}

export function reconstructTypeName(
    isArrayType: boolean,
    isStringMap: boolean,
    isAPIType: boolean,
    cleanTypeName: string,
) {

    let type = cleanTypeName;
    if (isArrayType) {
        type = `${type}[]`;
    }

    if (isAPIType) {
        type = `${type} | ${cleanTypeName}Properties${isArrayType ? '[]' : ''}`;
    }
    
    if (isStringMap) {
        type = `{ [key: string]: ${type} }`;
    }

    return type;
}

export function reconstructReturnTypeName(
    isArrayType: boolean,
    isStringMap: boolean,
    cleanTypeName: string,
    isOptional: boolean,
) {
    let type = cleanTypeName;
    if (isArrayType) {
        type = `${type}[]`;
    }
    
    if (isStringMap) {
        type = `{ [key: string]: ${type} }`;
    }

    if (isOptional) {
        type = `${type} | undefined`;
    }

    return type;
}

export function createGetterAndSetterForProperty(
    modelClass: ClassDeclaration,
    interfaceDeclaration: InterfaceDeclaration,
    apiTypes: Set<string>,
) {
    interfaceDeclaration.getProperties().forEach(p => {
        const name = p.getName();
        if (!comparePropertyName(name, 'metadata')) {

            const classProperty = modelClass.getProperty((p) => comparePropertyName(p.getName(), name));
            if (!classProperty) {
                console.error(`Failed to find property: ${name} in class: ${modelClass.getName()}`);
                return;
            }

            classProperty.rename(`_${name}`);

            const typeName = cleanTypeNameFromImport(classProperty.getType().getText());
            const { isArrayType, isStringMap, cleanTypeName } = extractCleanTypeName(typeName);
            const isAPIType = apiTypes.has(cleanTypeName);
            const type = reconstructParameterTypeName(isArrayType, isStringMap, isAPIType, p.hasQuestionToken(), cleanTypeName);
            const returnType = reconstructReturnTypeName(isArrayType, isStringMap, cleanTypeName, p.hasQuestionToken());

            modelClass.addGetAccessor({
                name: name,
                isStatic: false,
                returnType: returnType,
                statements: [
                    `return this._${name};`
                ]
            });

            modelClass.addSetAccessor({
                name: name,
                isStatic: false,
                parameters: [
                    {
                        name: 'value',
                        type: type,
                    }
                ],
                statements: [
                    isAPIType 
                        ? createAPITypeSetterMethod(name, cleanTypeName, isArrayType, isStringMap, p.hasQuestionToken())
                        : createStandardTypeSetterMethod(name)
                ]
            });
        }
    });
}

function createStandardTypeSetterMethod(name: string) {
    return dedentString(`
        this._${name} = value;
    `, 4);
}

export function createAPITypeSetterMethod(
    name: string,
    cleanTypeName: string,
    isArrayType: boolean,
    isStringMap: boolean,
    isOptional: boolean,
): string {

    const optionalCheck = dedentString(`
        if (!value) {
            this._${name} = undefined;
            return;
        }`,
    4);

    let result = undefined
    if (isStringMap) {
        if (isArrayType) {
            result = [
                isOptional ? optionalCheck : undefined,
                dedentString(`
                    const result: { [key: string]: ${cleanTypeName}[] } = {};
                    for (const [key, item] of Object.entries(value)) {
                        if (item instanceof ${cleanTypeName}) {
                            if (result[key]) {
                                result[key].push(item);
                            } else {
                                result[key] = [item];
                            }
                        } else {
                            if (result[key]) {
                                result[key].push(new ${cleanTypeName}(item));
                            } else {
                                result[key] = [new ${cleanTypeName}(item)];
                            }
                        }
                    }
                    this._${name} = result;`,
                4),
            ]
        } else {
            result = [
                isOptional ? optionalCheck : undefined,
                dedentString(`
                    const result: { [key: string]: ${cleanTypeName} } = {};
                    for (const [key, item] of Object.entries(value)) {
                        if (item instanceof ${cleanTypeName}) {
                            result[key] = item;
                        } else {
                            result[key] = new ${cleanTypeName}(item);
                        }
                    }
                    this._${name} = result;`,
                4),
            ];
        }
    } else if (isArrayType) {
        result = [
            isOptional ? optionalCheck : undefined,
            dedentString(`
                const result: ${cleanTypeName}[] = [];
                for (const item of value) {
                    if (item instanceof ${cleanTypeName}) {
                        result.push(item);
                    } else {
                        result.push(new ${cleanTypeName}(item));
                    }
                }
                this._${name} = result;`,
            4),
        ];
    } else {
        result = [
            isOptional ? optionalCheck : undefined,
            dedentString(`
                if (value instanceof ${cleanTypeName}) {
                    this._${name} = value;
                } else {
                    this._${name} = new ${cleanTypeName}(value);
                }`, 
            4),
        ];
    }

    return result.filter(statement => statement !== undefined).join('\n');
}

export function dedentString(text: string, addIndent: number): string {
    const splitted = text.split(/\n/g);
    let leastSpaces = undefined;
    for (const line of splitted) {
        if (line.length === 0) {
            continue;
        }
        let tmpSpaces = 0;
        for (const char of line) {
            if (char === ' ') {
                tmpSpaces++;
            } else {
                break;
            }
        }
        if (leastSpaces === undefined || tmpSpaces < leastSpaces) {
            leastSpaces = tmpSpaces;
        }
    }
    const res = splitted.map(
        line => line.length === 0 ? line : line.slice(leastSpaces)
    ).join('\n');

    return res;
}