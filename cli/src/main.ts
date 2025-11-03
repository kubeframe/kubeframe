import { Command } from "commander";
import { generate } from "./kubernetes.js";
import { generateFromConfigFile, generateFromFile, generateFromUrl } from "./crd.js";
import { createProject } from "./createProject.js";

const LATEST_K8S_VERSION = '1.34';

const program = new Command();
program
    .name('@kubeframe/cli');

program
    .command('generate-k8s')
    .description('Generate Kubernetes models')
    .option('-o, --output <char>', 'Output directory', '../core/src')
    .argument('[version]', 'Kubernetes version', LATEST_K8S_VERSION)
    .action((version, options) => {
        generate(version, options.output);
    });

const crdCommand = program
    .command('generate-crd')
    .description('Generate CRD models');

crdCommand
    .command('from-url')
    .argument('<url>', 'URL to CRD YAML file')
    .option('-v, --version <char>', 'Kubernetes version', LATEST_K8S_VERSION)
    .option('-o, --output <char>', 'Output directory', './output-crd')
    .action((url, options) => {
        generateFromUrl(url, options.output, options.version);
    });

crdCommand
    .command('from-file')
    .argument('<file>', 'Path to CRD YAML file')
    .option('-v, --version <char>', 'Kubernetes version', LATEST_K8S_VERSION)
    .option('-o, --output <char>', 'Output directory', './output-crd')
    .action((file, options) => {
        generateFromFile(file, options.output, options.version);
    });

crdCommand
    .command('from-config-file')
    .argument('<file>', 'Path to CRD config file')
    .option('-v, --version <char>', 'Kubernetes version', LATEST_K8S_VERSION)
    .option('-o, --output <char>', 'Output directory', './output-crd')
    .action((file, options) => {
        generateFromConfigFile(file, options.output, options.version);
    });

program
    .command('create-project')
    .description('Create a new project')
    .argument('<name>', 'Project name')
    .option('-v, --version <char>', 'Kubernetes version', LATEST_K8S_VERSION)
    .action((name, options) => {
        createProject(name, options.version);
    });

program.parse();
