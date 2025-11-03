# CRDs Example

This example demonstrates how to generate and use CRD classes in a project.

## Files

* `crds.yaml` - CRD configuration file, which contains a list of CRD URLs.
* `static/static-prometheus-rule.yaml` - Static PrometheusRule manifest to showcase importing YAML and initialze it as CRD class.

## Running the example

### Setup

*Example expects that you have have generated kubernetes source locally using cli, if not run following commands to use released version of kubeframe.*

```bash
npm run use-release-version -- --version 1.34
```

```bash
npm install
```

### Generate CRD classes

```bash
npm run generate
```

### Build the project

```bash
npm build
```

### Run the project

```bash
npm start
```
