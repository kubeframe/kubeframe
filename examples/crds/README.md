# CRDs Example

This example demonstrates how to generate and use CRD classes in a project.

## Files

* `crds.yaml` - CRD configuration file, which contains a list of CRD URLs.
* `static/static-prometheus-rule.yaml` - Static PrometheusRule manifest to showcase importing YAML and initialze it as CRD class.

## Running the example

### Setup

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
