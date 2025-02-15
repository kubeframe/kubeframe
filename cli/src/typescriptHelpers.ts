import { SourceFile } from "ts-morph";

export function comparePropertyName(a: string, b: string) {
    return a === b || a === `'${b}'` || a === `"${b}"`;
}

export function convertClassToInterface(sourceFile: SourceFile, className: string, interfaceName: string) {
    
}

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
