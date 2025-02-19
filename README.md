# kubeframe

## Introduction

Kubeframe is a set of tools and Typescript libraries to build flexible and reusable Kubernetes manifest generation applications.

## Features

### CLI Features

* Generate typescript classes for Kubernetes resources.
* Generate typescript classes for CRDs.
* Generate a new project with a predefined structure and dependencies.

### Core Features

* Base classes for building reusable applications which generate Kubernetes manifests.
* Utility classes to import Kubernetes resources from YAML files and Helm template generated YAML files.
* Export Kubernetes resources as YAML files.
* Export Kubernetes resources as Helm Charts.

## Getting started

### Create a new project

```bash
npx @kubeframe/cli create-project my-project --version=1.32
```

### Build the project

```bash
cd my-project
npm install
npm run build
```

#### Contents of the generated project

##### Dependencies

* All projects generated with KubeFrame depend on `kubeframe/k8s` and `kubeframe/core`.
* The `kubeframe/k8s` itself does not actually exist as a package but it used as an alias to the `@kubeframe/k8s-<version>` packages.
* This approach allows you to easily switch between different versions of the `@kubeframe/k8s` package.

##### Overriding the `@kubeframe/k8s` alias

```
"@kubeframe/k8s": "npm:@kubeframe/k8s-<k8s-version>@<version>"
```

##### Importing kubernetes resources classes

All dependencies from must be imported via `@kubeframe/k8s` alias.

Example:

```typescript
import { Deployment } from '@kubeframe/k8s/apps/v1/Deployment';
import { Service } from '@kubeframe/k8s/core/v1/Service';
```
