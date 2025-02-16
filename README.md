# KubeFrame

## Introduction

KubeFrame is a set of tools and Typescript libraries to build flexible and reusable Kubernetes manifest generation applications.

## Features

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

All projects generated with KubeFrame depend on `kubeframe/k8s` and `kubeframe/core`.
The `kubeframe/k8s` itself does not actually exist as a package but it used as an alias to the `@kubeframe/k8s-<version>` packages.
This approach allows you to easily switch between different versions of the `@kubeframe/k8s` package.
Also final application can easily override the version of the package by specifying dependency as follows:

```
"@kubeframe/k8s": "npm:@kubeframe/k8s-<k8s-version>@<version>"
```

All dependencies from must be imported via `@kubeframe/k8s` alias.

Example:

```typescript
import { Deployment } from '@kubeframe/k8s/apps/v1/Deployment';
```
