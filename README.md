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

### Generate CRDs if needed

By default created project does not contain any CRDs. But if project root contains `crds-config.yaml` following command can be used to generate CRD classes.
Generated CRD classes will be placed in the `src/crds` directory.

```bash
npm run generate
```

#### CRD configuration file format example

```yaml
crds:
# Kube-prometheus-stack
- https://raw.githubusercontent.com/prometheus-community/helm-charts/refs/heads/main/charts/kube-prometheus-stack/charts/crds/crds/crd-servicemonitors.yaml 
- https://raw.githubusercontent.com/prometheus-community/helm-charts/refs/heads/main/charts/kube-prometheus-stack/charts/crds/crds/crd-prometheusrules.yaml
- https://raw.githubusercontent.com/prometheus-community/helm-charts/refs/heads/main/charts/kube-prometheus-stack/charts/crds/crds/crd-alertmanagerconfigs.yaml
- https://raw.githubusercontent.com/prometheus-community/helm-charts/refs/heads/main/charts/kube-prometheus-stack/charts/crds/crds/crd-alertmanagers.yaml
- https://raw.githubusercontent.com/prometheus-community/helm-charts/refs/heads/main/charts/kube-prometheus-stack/charts/crds/crds/crd-podmonitors.yaml
- https://raw.githubusercontent.com/prometheus-community/helm-charts/refs/heads/main/charts/kube-prometheus-stack/charts/crds/crds/crd-probes.yaml
# Sealed secrets
- https://raw.githubusercontent.com/bitnami-labs/sealed-secrets/refs/heads/main/helm/sealed-secrets/crds/bitnami.com_sealedsecrets.yaml
# Sloth
- https://raw.githubusercontent.com/slok/sloth/main/pkg/kubernetes/gen/crd/sloth.slok.dev_prometheusservicelevels.yaml

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
* Created project always overrides `@kubeframe/k8s` and `@kubeframe/core` under package.json `overrides` section.
  This enforced to use the same version of `@kubeframe/k8s` and `@kubeframe/core` packages.

##### Overriding the `@kubeframe/k8s` alias

```
"@kubeframe/k8s": "npm:@kubeframe/k8s-<k8s-version>@<version>"
```

##### Importing and using Kubernetes resources classes

All dependencies from must be imported via `@kubeframe/k8s` alias.

Example:

```typescript
import { k8s } from '@kubeframe/k8s';

const service = new k8s.core.v1.Service({
    ...
});

const deployment = new k8s.apps.v1.Deployment({
    ...
});

```

## Examples

Examples are located in the `examples` directory.

* [CRDs Example](examples/crds/README.md)
* [Values and schema example](examples/values-file/README.md)
