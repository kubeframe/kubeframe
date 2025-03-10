import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { ClassDeclaration, InterfaceDeclaration, Project, SourceFile } from "ts-morph";
import { GroupVersionKind, groupVersionToString } from "./kubernetes.js";

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

    const witoutQuotes = name.replace(/['"]+/g, '');

    // Valid identifiers in JS/TS: Must start with a letter, $, or _, followed by letters, numbers, $, or _
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(witoutQuotes)) {
        return witoutQuotes; // No quotes needed
    }
    return `'${witoutQuotes}'`; // Keep quotes if it's not a valid identifier
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

export function addClassConstructor(
    modelClass: ClassDeclaration,
    groupVersionKind: GroupVersionKind,
    interfaceDeclaration: InterfaceDeclaration)
{
    modelClass.addConstructor({
        parameters: [
            {
                name: 'args',
                type: `${groupVersionKind.kind}Args`,
                hasQuestionToken: false,
            }
        ],
        statements: [
            `super('${groupVersionToString(groupVersionKind)}', '${groupVersionKind.kind}', args.metadata);`,
            interfaceDeclaration.getProperties().map(p => {
                const name = p.getName();
                // Metadata is inherited from APIResource or NamespacedAPIResource and passed in via constructor
                if (!comparePropertyName(name, 'metadata')) {
                    if (name.includes(`'`)) {
                        return `this[${name}] = args[${name}];`;
                    } else {
                        return `this.${name} = args.${name};`;
                    }
                }
            })
            .filter(statement => statement)
            .join('\n'),
        ],
    });
}
