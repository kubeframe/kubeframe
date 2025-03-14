import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { compile } from 'json-schema-to-typescript';
import path = require('path');
import { Project, SyntaxKind } from 'ts-morph';
import * as YAML from 'yaml';
import { addClassConstructor, addToIndexImportTree, comparePropertyName, convertInterfaceToClass } from './typescriptHelpers.js';
import { GroupVersionKind, groupVersionKindToString } from './kubernetes.js';

interface CRD {
    apiVersion: string;
    kind: string;
    metadata: {
        name: string;
    };
    spec: {
        group: string;
        names: {
            kind: string;
            listKind: string;
            plural: string;
            singular: string;
        };
        scope: string;
        versions: {
            name: string;
            schema: {
                openAPIV3Schema: any
            };
        }[];
    };
}

interface CRDConfig {
    crds: string[];
}

export async function generateFromUrl(url: string, output: string) {
    try {
        const res = await fetch(url);
        const crd = YAML.parse(await res.text()) as CRD;
        generate(crd, output);
    } catch (ex) {
        console.error(ex);
    }
}

export async function generateFromFile(file: string, output: string) {
    try {
        const crd = YAML.parse(await readFile(file, 'utf-8')) as CRD;
        generate(crd, output);
    } catch (ex) {
        console.error(ex);
    }
}

export async function generateFromConfigFile(file: string, output: string) {
    try {
        const config = YAML.parse(await readFile(file, 'utf-8')) as CRDConfig;
        for (const crd of config.crds) {
            if (crd.startsWith('http://') || crd.startsWith('https://')) {
                await generateFromUrl(crd, output);
            } else {
                await generateFromFile(crd, output);
            }
        }
    } catch (ex) {
        console.error(ex);
    }
}

async function generate(crd: CRD, output: string) {
    for (const version of crd.spec.versions) {
        const source = await compile(
            version.schema.openAPIV3Schema,
            crd.spec.names.kind,
            {
                additionalProperties: false,
            }
        );

        const groupVersionKind: GroupVersionKind = {
            group: crd.spec.group,
            version: version.name,
            kind: crd.spec.names.kind,
        };

        console.info(`Generating ${groupVersionKind.kind} for ${groupVersionKind.group}/${groupVersionKind.version}`);
        const modified = transformTSSource(source, groupVersionKind, crd.spec.scope === 'Namespaced');

        const groupVersionDir = path.join(output, ...groupVersionKind.group.split('.'), groupVersionKind.version);
        if (!existsSync(groupVersionDir)) {
            mkdirSync(groupVersionDir, { recursive: true });
        }

        writeFileSync(path.join(groupVersionDir, `${groupVersionKind.kind}.ts`), modified);

        addToIndexImportTree('crds', output, [...groupVersionKind.group.split('.'), groupVersionKind.version, groupVersionKind.kind]);
        createOrUpdateCRDAPIResourceFactory(output, groupVersionKind);
        createIndexFile(output);
    }
}

function createIndexFile(output: string) {
    const index = `
    import * as crds from './crds.js';
    import { registerCRDs } from './CRDFactory.js';
    export { crds, registerCRDs };
    `;

    writeFileSync(path.join(output, 'index.ts'), index);
}

function createOrUpdateCRDAPIResourceFactory(output: string, groupVersionKind: GroupVersionKind) {
    const factoryFile = path.join(output, 'CRDFactory.ts');
    if (!existsSync(factoryFile)) {
        writeFileSync(factoryFile, createAPIResourceFactory());
    }
    
    updateAPIResourceFactory(factoryFile, groupVersionKind);
}

function createAPIResourceFactory(): string {
    return `
import { APIResourceFactory } from '@kubeframe/k8s';
import * as crds from './crds.js';
export function registerCRDs() {
    
}
`;
}

function updateAPIResourceFactory(file: string, groupVersionKind: GroupVersionKind) {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(file);

    const alias = ['crds', groupVersionKind.group, groupVersionKind.version, groupVersionKind.kind].join('.');

    const registerCRDs = sourceFile.getFunction('registerCRDs');
    if (registerCRDs) {
        registerCRDs.addStatements(`APIResourceFactory.registerResource('${groupVersionKindToString(groupVersionKind)}', (json: any) => new ${alias}(json));`);
    }

    project.saveSync();
}

function transformTSSource(source: string, groupVersionKind: GroupVersionKind, namespaced: boolean): string {

    const project = new Project();
    const sourceFile = project.createSourceFile('temp.ts', source);

    // ObjectMeta import
    sourceFile.addImportDeclaration({
        moduleSpecifier: '@kubeframe/k8s',
        namedImports: [ 'k8s', namespaced ? 'NamespacedAPIResource' : 'APIResource' ],
    });

    const interfaces = sourceFile.getInterfaces();
    if (interfaces.length > 0) {

        const interfaceDeclaration = interfaces[0];
        interfaceDeclaration.getProperty((prop) => comparePropertyName(prop.getName(), 'metadata'))
            ?.setType(namespaced ? 'k8s.meta.v1.NamespacedObjectMeta' : 'k8s.meta.v1.ObjectMeta')
            .setHasQuestionToken(false);

        // Extract spec into new interface
        const specProperty = interfaceDeclaration.getProperty((prop) => comparePropertyName(prop.getName(), 'spec'));
        if (specProperty) {
            // const specType = specProperty.getFullText();
            const specInterfaceName = interfaceDeclaration.getName() + 'Spec';
            const specInterace = sourceFile.insertInterface(interfaceDeclaration.getChildIndex(), {
                name: specInterfaceName,
            });

            const body = specProperty.getChildrenOfKind(SyntaxKind.TypeLiteral).map((typeLiteral) => {
                return typeLiteral.getProperties().map(prop => prop.getFullText());
            }).flatMap((props) => props).join('\n');

            // Currently there is not a better way to do this while keeping the comments and formatting
            specInterace.insertText(specInterace.getEnd() - 1, `${body}\n`);

            interfaceDeclaration.getProperty((prop) => comparePropertyName(prop.getName(), 'spec'))?.setType(specInterfaceName);
        }

        const interfaceName = interfaceDeclaration.getName();
        const newInterfaceName = interfaceName + 'Args';
        interfaceDeclaration.rename(newInterfaceName);

        interfaceDeclaration.getProperty((prop) => comparePropertyName(prop.getName(), 'apiVersion'))?.remove();
        interfaceDeclaration.getProperty((prop) => comparePropertyName(prop.getName(), 'kind'))?.remove();

        const modelClass = convertInterfaceToClass(sourceFile, newInterfaceName, interfaceName);
        if (modelClass) {

            modelClass.getProperty((prop) => comparePropertyName(prop.getName(), 'metadata'))?.remove();
            modelClass.getProperty((prop) => comparePropertyName(prop.getName(), 'apiVersion'))?.remove();
            modelClass.getProperty((prop) => comparePropertyName(prop.getName(), 'kind'))?.remove();
            
            modelClass.setExtends(namespaced ? 'NamespacedAPIResource' : 'APIResource');

            addClassConstructor(modelClass, groupVersionKind, interfaceDeclaration);
        }
    }

    return sourceFile.getText();
}
