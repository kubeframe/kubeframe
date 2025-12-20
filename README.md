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
* Export Kubernetes resources to Kubernetes.

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

### Contents of a project

- src/application.ts - Application which can be composed of one or more components
- src/component.ts - Sample component which can be composed of one or more Kubernetes resources.
- src/main.ts - Entry point

### Build the project

```bash
cd my-project
npm install
npm run build
```

## Creating Application and Components

### Using Kubernetes resources classes

Example:

```typescript
import { k8s, Component } from '@kubeframe/kubeframe-<version>';

export class MyComponent extends Component {

    constructor() {
        super(MyComponent.name);
    }

    async build(): Promise<void> {
        const service = new k8s.core.v1.Service({
            metadata: {
                name: 'my-service',
            },
        });

        this.addResource(service);

        const deployment = new k8s.apps.v1.Deployment({
            metadata: k8s.meta.{
                name: 'my-deployment',
            },
            spec: {
                ...
            }
        });

        this.addResource(deployment);
    }
}

```

All plain objects will be converted to classes implicitly. This approach can provide a lot of additional
features that can be easily implemented through on of the common base classes:
- `KubernetesType`
- `APIObject`
- `NamespacedAPIObject`
- `APIObjectList`

Example:

```typescript

const service = new k8s.core.v1.Service({
    // metadata will be converted into instance of k8s.meta.v1.ObjectMeta
    metadata: {
        name: 'my-service',
    },
});
```

### Dependencies between Kubernetes resources

It is possible to define dependencies between Kubernetes resources.
Dependencies are checked and resources are sorted based on dependencies before exporting to:
- YAML
- Helm
- Kubernetes - Rollback and destroy will use reverse order to rollback or destroy resources.

Example:

In this example `my-deployment` Deployment will be created before `my-service` Service.

```typescript
import { k8s, Component } from '@kubeframe/kubeframe-<version>';

export class MyComponent extends Component {

    constructor() {
        super(MyComponent.name);
    }

    async build(): Promise<void> {
        const service = new k8s.core.v1.Service({
            metadata: {
                name: 'my-service',
            },
        });

        service.addDependency('apps/v1/Deployment/my-deployment');
        this.addResource(service);

        const deployment = new k8s.apps.v1.Deployment({
            metadata: k8s.meta.{
                name: 'my-deployment',
            },
            spec: {
                ...
            }
        });

        this.addResource(deployment);
    }
}

```

## Examples

Examples are located in the `examples` directory.

* [CRDs Example](examples/crds/README.md)
* [Values and schema example](examples/values-file/README.md)
