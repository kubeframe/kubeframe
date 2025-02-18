import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import * as latestVersion from 'latest-version';

export async function createProject(name: string, version: string) {
    console.info(`Creating project '${name}' with Kubernetes version ${version}`);

    const projectDir = `./${name}`;

    if (existsSync(projectDir)) {
        console.error(`Directory '${name}' already exists, aborting`);
        return;
    }
    
    // Create project directory
    mkdirSync(projectDir);

    // Create src directory
    mkdirSync(`${projectDir}/src`);

    const latestCoreVersion = await latestVersion.default('@kubeframe/core');
    const latestK8sVersion = await latestVersion.default(`@kubeframe/k8s-${version}`);
    const latestTypescriptVersion = await latestVersion.default(`typescript`);
    const latestNodeTypes = await latestVersion.default('@types/node');

    // Create package.json
    const packageJson = {
        name,
        version: '0.0.1',
        description: '',
        main: 'dist/main.js',
        type: 'module',
        scripts: {
            build: 'rm -rf ./dist && tsc',
            start: 'node dist/main.js',
        },
        dependencies: {
            "@kubeframe/core": `~${latestCoreVersion}`,
            "@kubeframe/k8s": `npm:@kubeframe/k8s-${version}@~${latestK8sVersion}`,
        },
        devDependencies: {
            "typescript": `^${latestTypescriptVersion}`,
            "@types/node": `^${latestNodeTypes}`,
        },
        keywords: [],
    };

    writeFileSync(`${projectDir}/package.json`, JSON.stringify(packageJson, null, 4));

    // Create tsconfig.json
    const tsconfig = {
        "compilerOptions": {
            "lib": ["ESNext"],
            "target": "ESNext",
            "module": "NodeNext",
            "moduleResolution": "Node16",
            "declaration": true,
            "strict": true,
            "skipLibCheck": true,
            "noFallthroughCasesInSwitch": true,
            "noEmitOnError": true,
            "outDir": "dist",
            "rootDir": "src"
        },
        "exclude": [
            "dist"
        ]
    };

    writeFileSync(`${projectDir}/tsconfig.json`, JSON.stringify(tsconfig, null, 4));

    // Copy main.ts from project_base
    copyFileSync(`${import.meta.dirname}/project_base/main.ts`, `${projectDir}/src/main.ts`);

    console.info(`Project '${name}' created`);
    console.info(`To build the project, run 'cd ${name} && npm install && npm run build'`);
    console.info(`To run the project, run 'npm start'`);
}
