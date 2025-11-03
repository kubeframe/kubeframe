# Values and schema example

This example demonstrates how to support values files and generate schema for them.

## Features of this example

* Possibility to use values files in the project.
* Generate schema for values files.
* Possible to specify default values for values files.
* If configuration is referencing types from `k8s` package, it will automatically generate schema for them with documentation.

## Files

* `values.yaml` - Sample file containing values and reference to schema.
* `schema.json` - Sample schema file which is used to validate values file.

## Running the example

### Setup

*Example expects that you have have generated kubernetes source locally using cli, if not run following commands to use released version of kubeframe.*

```bash
npm run use-release-version -- --version 1.34
```

```bash
npm install
```

### Generate schema

```bash
npm run generate-schema
```

### Build the project

```bash
npm build
```

### Run the project

```bash
npm start
```
