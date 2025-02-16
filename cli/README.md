# KubeFrame-CLI

KubeFrame-CLI is a tool for generating Typescript classes and interfaces from Kubernetes OpenAPI specs and CRDs.

## Installation and Usage

### Prerequisites

- Node.js 22.11 or later
- Docker - Used for running the OpenAPI generator
- Git - Used for fetching the OpenAPI specs from the Kubernetes repository

### Usage

#### Create a new project

```bash
# npx @kubeframe/cli create-project <project-name> --version=<k8s-version> 
npx @kubeframe/cli create-project my-project --version=1.32
```

#### Generate Kubernetes classes and interfaces

- <version> - Kubernetes version without patch version (e.g. 1.31)

```bash
# kubeframe-cli generate-k8s <version> --output=<output-dir>
kubeframe-cli generate-k8s 1.31 --output=<output-dir>
```

#### Generate CRD classes and interfaces

##### From a local file

```bash

```

##### From a URL

```bash

```

##### From a config file
