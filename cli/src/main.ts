import { Command } from "commander";
import { generate } from "./kubernetes.js";
import { generateFromConfigFile, generateFromFile, generateFromUrl } from "./crd.js";
import { createProject } from "./createProject.js";

const program = new Command();
program
    .name('@kubeframe/cli');

program
    .command('generate-k8s')
    .description('Generate Kubernetes models')
    .option('-o, --output <char>', 'Output directory', './output-k8s')
    .argument('[version]', 'Kubernetes version', '1.32')
    .action((version, options) => {
        generate(version, options.output);
    });

const crdCommand = program
    .command('generate-crd')
    .description('Generate CRD models');

crdCommand
    .command('from-url')
    .argument('<url>', 'URL to CRD YAML file')
    .option('-o, --output <char>', 'Output directory', './output-crd')
    .action((url, options) => {
        generateFromUrl(url, options.output);
    });

crdCommand
    .command('from-file')
    .argument('<file>', 'Path to CRD YAML file')
    .option('-o, --output <char>', 'Output directory', './output-crd')
    .action((file, options) => {
        generateFromFile(file, options.output);
    });

crdCommand
    .command('from-config-file')
    .argument('<file>', 'Path to CRD config file')
    .option('-o, --output <char>', 'Output directory', './output-crd')
    .action((file, options) => {
        generateFromConfigFile(file, options.output);
    });

program
    .command('create-project')
    .description('Create a new project')
    .argument('<name>', 'Project name')
    .option('-v, --version <char>', 'Kubernetes version', '1.32')
    .action((name, options) => {
        createProject(name, options.version);
    });

program.parse();
