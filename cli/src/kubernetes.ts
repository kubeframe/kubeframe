import { execSync } from 'child_process';
import {
    copyFileSync,
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    renameSync,
    writeFileSync,
} from 'fs';
import * as path from 'path';
import _ from 'lodash';
import { ClassDeclaration, Project, SourceFile, ts } from "ts-morph";
import { chunkArray, formatComment, upperCaseFirstLetter } from './util.js';
import {
    addClassConstructor,
    addToIndexImportTree,
    comparePropertyName,
    removeUnnecessaryQuotesFromPropertyName,
} from './typescriptHelpers.js';
import { promises as fsPromises } from 'fs';
import dedent from 'dedent';

export interface GroupVersionKind {
    group: string;
    version: string;
    kind: string;
}

interface KubernetesOpenApiSpec {
    components: {
        schemas: {
            [model: string]: {
                description: string;
                properties?: {
                    [property: string]: {
                        description?: string;
                        [key: string]: any;
                    };
                };
                type: string;
                required?: string[];
                'x-kubernetes-map-type'?: string;
                'x-kubernetes-group-version-kind'?: GroupVersionKind[];
            };
        },
    },
    paths: {
        [key: string]: {
            post?: {
                'x-kubernetes-group-version-kind': GroupVersionKind;
            }
        }
    }
}

export interface SchemaModelRemap {
    [name: string]: {
        schemaName: string;
        fileName: string;
        body?: any;
    }
}

export interface ApiResourceProperties {
    isNamespaced: boolean;
}

export interface FactoryGenerationProperties {
    groupVersionKind: GroupVersionKind;
    className: string;
    path: string;
}

export interface GenerationState {
    nameComponentsMapping: Map<string, string[]>;
    nameToGroupVersionKind: Map<string, GroupVersionKind>;
    apiResourceProperties: Map<string, ApiResourceProperties>;
    factoryGenerationProperties: FactoryGenerationProperties[];
}

export function groupVersionToString(groupVersionKind: GroupVersionKind) {
    return [groupVersionKind.group, groupVersionKind.version]
        .filter(item => item && item !== '')
        .join('/');
}

export function groupVersionKindToString(groupVersionKind: GroupVersionKind) {
    return `${groupVersionToString(groupVersionKind)}/${groupVersionKind.kind}`;
}

function fetchKubernetesOpenApiSpecs(version: string, directory: string) {

    if (existsSync(directory)) {
        return true
    }

    // Clone the kubernetes repository
    const cloneCmd = `git clone --depth 1 --branch release-${version} https://github.com/kubernetes/kubernetes.git ${directory}`
    execSync(cloneCmd, {
        stdio: 'inherit',
    });

    // verify path kubernetes/api/openapi-spec/v3 is present
    const apiPath = path.join(directory, '/api/openapi-spec/v3');
    return existsSync(apiPath);
}

function preprocessKubernetesOpenApiSpecs(directory: string, state: GenerationState) {

    const specs: Map<string, KubernetesOpenApiSpec> = new Map();
    const schemaModelRemap: SchemaModelRemap = {};

    /**
     * Map of old name to new name so it could be used to update references
     */
    const reverseNameMapping: Map<string, string> = new Map();

    // For each .json file in the directory
    const files = readdirSync(directory);
    for (const file of files) {
        console.info(`Pre-processing file: ${file}`);

        const schema = JSON.parse(readFileSync(path.join(directory, file)).toString()) as KubernetesOpenApiSpec;

        for (const [name, body] of Object.entries(schema.components.schemas)) {
            console.log(`Processing schema: ${name} from: ${file}`);

            if (!name.startsWith('io.k8s')) {
                console.log(`Skipping schema: ${name}`);
                continue;
            }
            
            const nameParts = name.split('.');
            const [group, version, kind] = nameParts.slice(-3);
            const newName = `${upperCaseFirstLetter(group)}${upperCaseFirstLetter(version)}${upperCaseFirstLetter(kind)}`;

            if (schemaModelRemap[newName]) {
                // As long as the bodies are equal, we can ignore the duplicate because they will end up being the same model
                if (!_.isEqual(schemaModelRemap[newName].body, body)) {
                    console.error(`Duplicate model name: ${newName} found in ${file} and ${schemaModelRemap[newName].fileName}`);
                }
            }

            schema.components.schemas[newName] = body;
            delete schema.components.schemas[name];

            schemaModelRemap[newName] = {
                schemaName: name,
                fileName: file,
                body: body,
            }

            reverseNameMapping.set(name, newName);
            state.nameComponentsMapping.set(newName, [group, version, kind]);

            // Only top level API resources have this property
            if (body["x-kubernetes-group-version-kind"]) {
                if (body["x-kubernetes-group-version-kind"].length === 1) {
                    state.nameToGroupVersionKind.set(newName, {
                        ...body["x-kubernetes-group-version-kind"][0],
                    });
                } else if (body["x-kubernetes-group-version-kind"].length > 1) {
                    console.log(`Multiple group version kinds found for: ${newName}`);
                }
            }
        }

        for (const [path, body] of Object.entries(schema.paths)) {
            if (body.post) {
                const isNamespaced = path.includes('{namespace}');
                const groupVersionKind = {
                    ...body.post['x-kubernetes-group-version-kind']
                };

                if (groupVersionKind) {
                    state.apiResourceProperties.set(groupVersionKindToString(groupVersionKind), {
                        isNamespaced: isNamespaced,
                    });
                }
            }
        }
    
        specs.set(file, schema);
    }

    // Update references
    for (const schema of specs.values()) {
        console.info(`Updating references in: ${schema}`);
        updateReferences(schema, reverseNameMapping);
    }

    // Write the updated schemas back to the files
    for (const [file, schema] of specs.entries()) {
        console.info(`Writing updated schema to: ${file}`);
        const schemaPath = path.join(directory, file);
        const schemaString = JSON.stringify(schema, null, 4);
        writeFileSync(schemaPath, schemaString);
    }

    return true;
}

function updateReferences(obj: any, reverseModelRemap: Map<string, string>) {
    for (const [key, value] of Object.entries(obj)) {
        if (key === '$ref' && typeof value === 'string') {
            const oldRef = value.split('#/components/schemas/')[1];
            const newRef = reverseModelRemap.get(oldRef);
            console.log(`Updating reference: ${oldRef} to: ${newRef}`);
            if (!newRef) {
                console.error(`Failed to find new ref for: ${oldRef}`);
            } else {
                obj[key] = value.replace(oldRef, newRef);
            }
        } else if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                for (const item of value) {
                    updateReferences(item, reverseModelRemap);
                }
            } else {
                updateReferences(value, reverseModelRemap);
            }
        }
    }
}

function runOpenApiGenerator(inputDir: string, outputDir: string, tmpDir: string) {

    const config = {
        spaces: 4,
        "generator-cli": {
            version: "7.17.0",
            useDocker: true,
            generators: {
                "v3.0": {
                    generatorName: "typescript",
                    glob: path.join(inputDir, '*.json'),
                    output: outputDir,
                    additionalProperties: {
                        supportsES6: true,
                        importFileExtension: ".js",
                        modelPropertyNaming: "original",
                        platform: "node",
                        useObjectParameters: true
                    },
                    // We only need models
                    globalProperty: "models"
                }
            }
        }
    };

    const configPath = path.join(tmpDir, 'openapi-generator-config.json');
    writeFileSync(configPath, JSON.stringify(config, null, 4));

    execSync(`npm run openapi-generate -- --openapitools ${configPath}`, {
        cwd: path.join(import.meta.dirname, '../'),
        stdio: 'inherit',
    });
}

function moveFilesToGroupVersionDirectories(modelsDir: string, state: GenerationState) {

    state.nameComponentsMapping.forEach((components, name) => {
        const [group, version, kind] = components;
        if (!existsSync(path.join(modelsDir, group, version))) {
            mkdirSync(
                path.join(modelsDir, group, version),
                {
                    recursive: true,
                }
            );
        }

        if (existsSync(path.join(modelsDir, name + '.ts'))) {
            renameSync(
                path.join(modelsDir, name + '.ts'),
                path.join(modelsDir, group, version, kind + '.ts'),
            );
        }
    });
}

export function removeUnnecessaryProperties(klass: ClassDeclaration) {
    const staticMembersToRemove: string[] = [
        'discriminator',
        'mapping',
        'attributeTypeMap',
    ];

    staticMembersToRemove.forEach(variable => {
        klass.getStaticMembers().forEach(m => {
            if (m.getName() === variable) {
                m.remove();
            }
        });
    });
}

export function removeUnnecessaryMethods(klass: ClassDeclaration) {
    const methodsToRemove: string[] = [
        'getAttributeTypeMap',
    ];

    methodsToRemove.forEach(method => {
        klass.getMethods().forEach(m => {
            if (m.getName() === method) {
                m.remove();
            }
        });
    });
}

export function removeUnnecessaryConstructors(klass: ClassDeclaration) {
    klass.getConstructors().forEach(ctor => {
        if (ctor.getParameters().length === 0) {
            ctor.remove();
        }
    });
}

export function postProcessSourceFile(sourceFile: SourceFile, state: GenerationState) {
    const filePath = sourceFile.getFilePath();
    const filePathParts = filePath.split('/');

    // group/version/kind.ts
    const version = filePathParts[filePathParts.length - 2];
    const group = filePathParts[filePathParts.length - 3];
    
    sourceFile.getImportDeclarations().forEach(imp => {
        const importPath = imp.getModuleSpecifierValue();
        console.log(`Processing import: ${importPath}`);

        // Remove imports which do not reference any models or are not needed
        if (!importPath.includes('models')) {
            imp.remove();
            return;
        }

        // Update the import paths
        const parts = importPath.split('/');
        const [baseName, fileExt] = parts[parts.length - 1].split('.');
        const nameComponents = state.nameComponentsMapping.get(baseName);
        if (!nameComponents) {
            console.error(`Failed to find name components for: ${baseName}`);
            return;
        }

        if (nameComponents[2] === 'Quantity' || nameComponents[2] === 'IntOrString') {
            imp.remove();
            return;
        }

        if (nameComponents[0] === group && nameComponents[1] === version) {
            const newImportPath = `./${nameComponents[2]}.${fileExt}`;
            imp.setModuleSpecifier(newImportPath);
        } else {
            const newImportPath = path.join('../../', nameComponents[0], nameComponents[1], `${nameComponents[2]}.${fileExt}`);
            imp.setModuleSpecifier(newImportPath);
        }

        if (imp.getNamedImports().length > 1) {
            console.error(`Multiple named imports found in: ${sourceFile.getFilePath()}`);
        }
        
        imp.getNamedImports().forEach(namedImport => {
            const name = namedImport.getName();
            const newName = state.nameComponentsMapping.get(name)?.[2];
            if (newName) {
                namedImport.setName(newName);
            }
        });
    });

    sourceFile.getClasses().forEach(modelClass => {
        console.log(`Processing class: ${modelClass.getName()}`);

        // Rename class to the kind
        const name = modelClass.getName();
        if (!name) {
            console.error(`Failed to find name for class in: ${sourceFile.getFilePath()}`);
            process.exit(1);
        }

        const nameComponents = state.nameComponentsMapping.get(name);
        if (!nameComponents) {
            console.error(`Failed to find name components for: ${name}`);
            return;
        }

        modelClass.rename(nameComponents[2]);

        // Change properties to correct types and remove quotes if possible
        modelClass.getProperties().forEach(property => {
            property.transform(traversal => {
                const node = traversal.visitChildren();
                if (ts.isIdentifier(node)) {
                    const typeName = node.getText();
                    const nameComponents = state.nameComponentsMapping.get(typeName);
                    if (!nameComponents) {
                        return node;
                    }

                    if (nameComponents[2] === 'Quantity' || nameComponents[2] === 'IntOrString') {
                        return traversal.factory.createUnionTypeNode([
                            traversal.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                            traversal.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
                        ]);
                    } else {
                        return traversal.factory.createIdentifier(nameComponents[2]);
                    }
                }

                return node;
            });
        });

        removeUnnecessaryProperties(modelClass);
        removeUnnecessaryMethods(modelClass);
        removeUnnecessaryConstructors(modelClass);

        const groupVersionKind = state.nameToGroupVersionKind.get(name);

        // If its api resource add constructor
        if (groupVersionKind) {
            const apiResourceProperties = state.apiResourceProperties.get(groupVersionKindToString(groupVersionKind));
            if (apiResourceProperties) {

                // Add APIResource or NamespacedAPIResource import
                sourceFile.addImportDeclaration({
                    moduleSpecifier: '../../../base/APIResource.js',
                    namedImports: [apiResourceProperties.isNamespaced ? 'NamespacedAPIResource' : 'APIResource'],
                });

                if (apiResourceProperties.isNamespaced) {
                    modelClass.setExtends('NamespacedAPIResource');
                    // If its a NamespacedAPIResource, rename ObjectMeta to NamespacedObjectMeta
                    sourceFile.getImportDeclarations().forEach(imp => {
                        imp.getNamedImports().forEach(namedImport => {
                            if (namedImport.getName() === 'ObjectMeta') {
                                namedImport.setName('NamespacedObjectMeta');
                            }
                        });
                    });
                } else {
                    modelClass.setExtends('APIResource');
                }

                const argsInterface = sourceFile.insertInterface(modelClass.getChildIndex(), {
                    name: `${groupVersionKind.kind}Args`,
                    properties: modelClass.getProperties().map(p => {
                        // Do not add apiVersion and kind to the args as they become readonly properties
                        if (comparePropertyName(p.getName(), 'apiVersion') || comparePropertyName(p.getName(), 'kind')) {
                            console.log(`Removing property: ${p.getName()}`);
                            return;
                        }

                        const typeNode = p.getTypeNode();
                        if (!typeNode) {
                            console.error(`Failed to find type node for property: ${p.getName()}`);
                            process.exit(1);
                        }

                        let typeName = typeNode.getText();
                        const isMetadataProperty = comparePropertyName(p.getName(), 'metadata');
                        if (isMetadataProperty) {
                            if (apiResourceProperties.isNamespaced) {
                                typeName = 'NamespacedObjectMeta';
                            } else {
                                typeName = 'ObjectMeta';
                            }
                        }

                        return {
                            name: removeUnnecessaryQuotesFromPropertyName(p.getName()),
                            type: typeName,
                            // Metadata is required
                            hasQuestionToken: comparePropertyName(p.getName(), 'metadata') ? false : p.hasQuestionToken(),
                            isReadonly: p.isReadonly(),
                            docs: p.getJsDocs().map(d => formatComment(d.getInnerText())),
                        };
                    }).filter(p => p !== undefined),
                })
                .setIsExported(true);

                // Metadata is inherited from APIResource or NamespacedAPIResource
                modelClass.getProperty((p => comparePropertyName(p.getName(), 'metadata')))?.remove();
                modelClass.getProperty((p => comparePropertyName(p.getName(), 'apiVersion')))?.remove();
                modelClass.getProperty((p => comparePropertyName(p.getName(), 'kind')))?.remove();

                addClassConstructor(modelClass, groupVersionKind, argsInterface);

                state.factoryGenerationProperties.push({
                    groupVersionKind: groupVersionKind,
                    className: groupVersionKind.kind,
                    path: path.join(group, version, groupVersionKind.kind),
                });
            } else {
                console.info(`No api resource properties found for: ${groupVersionKindToString(groupVersionKind)}, skipping because it's not creatable API resource`);
            }
        } else {

            const index = modelClass.getChildIndex();
            const newInterface = sourceFile
                .insertInterface(index, modelClass.extractInterface(nameComponents[2]))
                .setIsExported(true);

            // ObjectMeta needs special handling
            if (nameComponents[2] === 'ObjectMeta') {
                // Create a new interface for NamespacedObjectMeta
                sourceFile.insertInterface(newInterface.getChildIndex() + 1, {
                    name: 'NamespacedObjectMeta',
                    properties: newInterface.getProperties()
                        .filter(p => comparePropertyName(p.getName(), 'namespace'))
                        .map(p => {
                            return {
                                name: p.getName(),
                                type: p.getType().getText(),
                                hasQuestionToken: false,
                                docs: p.getJsDocs().map(d => formatComment(d.getInnerText())),
                            };
                        }),
                    docs: newInterface.getJsDocs().map(d => formatComment(d.getInnerText())),
                })
                .setIsExported(true)
                .insertExtends(0, 'ObjectMeta');

                newInterface.getProperty(p => comparePropertyName(p.getName(), 'namespace'))?.remove();
            }

            modelClass.remove();
        }
    });
}

async function postProcessModels(modelsDir: string, state: GenerationState) {

    const files = readdirSync(modelsDir, { recursive: true })
        .map(f => f.toString())
        .filter(f => f.endsWith('.ts'));

    const chunks = chunkArray(files, 10);

    for (const chunk of chunks) {
        await Promise.all(
            chunk.map(
                async (file) => {
                    console.log(`Processing file: ${file}`);
                    const filePath = path.join(modelsDir, file);
                    const content = await fsPromises.readFile(filePath, 'utf-8');
        
                    // Processing files one by one without giving access to FS directly,
                    // for some reason it causes problems with imports.
                    // Most likley it could be fixed with proper tsconfig.json
                    const sourceFile = new Project().createSourceFile(file, content);
                    postProcessSourceFile(sourceFile, state);
        
                    await fsPromises.writeFile(filePath, sourceFile.getFullText());
                }
            )
        );
    }
}

function copyDesiredApiSpecs(checkoutDir: string, inputDir: string) {

    if (!existsSync(inputDir)) {
        mkdirSync(inputDir);
    }

    const apiPath = path.join(checkoutDir, '/api/openapi-spec/v3');
    
    const ignoredFiles = [
        '.well-known__openid-configuration_openapi.json',
        'openid__v1__jwks_openapi.json',
        'logs_openapi.json',
        'version_openapi.json',
    ];

    // For each .json file in the directory
    const files = readdirSync(apiPath).filter(f => !ignoredFiles.includes(f));
    for (const file of files) {
        copyFileSync(path.join(apiPath, file), path.join(inputDir, file));
    }
}

function copyModels(modelsDir: string, outputDir: string) {

    const files = readdirSync(modelsDir, { recursive: true })
        .map(f => f.toString())
        // Only files which are not in api/ or util/ directories and are .ts files
        .filter(f => f.endsWith('.ts') && !f.startsWith('api/') && !f.startsWith('util/'));

    const uniqueDirs = new Set(files.map(f => path.dirname(f)));
    for (const dir of uniqueDirs) {
        if (!existsSync(path.join(outputDir, dir))) {
            mkdirSync(path.join(outputDir, dir), { recursive: true });
        }
    }

    const fileGroupVersionKinds: string[][] = []

    for (const file of files) {
        fileGroupVersionKinds.push(file.replace('.ts', '').split('/'));
        copyFileSync(path.join(modelsDir, file), path.join(outputDir, file));
    }

    fileGroupVersionKinds.map(e => {
        console.info(`Adding to index import tree: ${e}`);
        addToIndexImportTree('k8s', outputDir, e)
    });
}

function generateFactoryList(outputDir: string, factoryGenerationProperties: FactoryGenerationProperties[]) {

    const factoryContents = dedent(`
    import { FactoryFunction } from '../base/FactoryFunction.js';
    import * as k8s from './k8s.js';

    export const FACTORY_LIST: [string, FactoryFunction][] = [
        ${factoryGenerationProperties.map(prop => {
            const fullName = ['k8s', ...prop.path.split('/')].join('.');
            return `['${groupVersionKindToString(prop.groupVersionKind)}', (json: any) => new ${fullName}(json)]`;
        }).join(',\n    ')}
    ];
    `);

    writeFileSync(path.join(outputDir, 'FactoryList.ts'), factoryContents);
}

export async function generate(version: string, outputDir: string) {

    const tmpDir = path.join(process.cwd(), 'generated');
    console.info(`Using temp directory: ${tmpDir}, output directory: ${outputDir}`);

    if (!existsSync(tmpDir)) {
        mkdirSync(tmpDir, { recursive: true });
    }

    const checkoutDir = path.join(tmpDir, './kubernetes');
    const inputDir = path.join(tmpDir, './desired-api-specs');

    // Fetch kubernetes openapi specs
    if (!fetchKubernetesOpenApiSpecs(version, checkoutDir)) {
        console.error('Failed to fetch kubernetes openapi specs');
        process.exit(1);
    }

    copyDesiredApiSpecs(checkoutDir, inputDir);

    const state: GenerationState = {
        nameComponentsMapping: new Map(),
        nameToGroupVersionKind: new Map(),
        apiResourceProperties: new Map(),
        factoryGenerationProperties: [],
    };

    // Preprocess the specs
    preprocessKubernetesOpenApiSpecs(inputDir, state);

    // Generate the models
    const generatedDir = path.join(tmpDir, 'generated');
    runOpenApiGenerator(inputDir, generatedDir, tmpDir);

    // Post process the models
    const modelsDir = path.join(generatedDir, 'models');
    moveFilesToGroupVersionDirectories(modelsDir, state);
    await postProcessModels(modelsDir, state);
    
    // Copy the models to the target directory
    copyModels(modelsDir, path.join(outputDir, 'generated'));
    generateFactoryList(path.join(outputDir, 'generated'), state.factoryGenerationProperties);
}
