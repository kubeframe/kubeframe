# Changelog

## [0.5.3](https://github.com/kubeframe/kubeframe/compare/cli-v0.5.2...cli-v0.5.3) (2025-03-08)


### Fixes

* Add first test for cli ([7d23c58](https://github.com/kubeframe/kubeframe/commit/7d23c58ed4a25a8b4acc9d304c525d5c84ba2e29))
* Add tests to exclude so it won't get compiled into dist ([72e6437](https://github.com/kubeframe/kubeframe/commit/72e643722aa9929c7f47916b6d73c1273f2cbc1a))

## [0.5.2](https://github.com/kubeframe/kubeframe/compare/cli-v0.5.1...cli-v0.5.2) (2025-02-23)


### Fixes

* Use namespaced import for crds ([71991dc](https://github.com/kubeframe/kubeframe/commit/71991dc207c8b9ca1b7f8b63e2ac875c85ae3913))

## [0.5.1](https://github.com/kubeframe/kubeframe/compare/cli-v0.5.0...cli-v0.5.1) (2025-02-23)


### Fixes

* Export version ([0cbe42f](https://github.com/kubeframe/kubeframe/commit/0cbe42f296bf29543229c4361345f474b9486710))

## [0.5.0](https://github.com/kubeframe/kubeframe/compare/cli-v0.4.5...cli-v0.5.0) (2025-02-23)


### Features

* Simplify k8s importing and provide single entry to all files and include proper types export ([fc8f235](https://github.com/kubeframe/kubeframe/commit/fc8f2350bc6cb4d238c527f7d79f46ebe44f9fac))


### Fixes

* Add index.ts for base dir, its not generated anymore ([f9a76e5](https://github.com/kubeframe/kubeframe/commit/f9a76e570ea24b55eb5f617c115c71d5ef3d2e3f))
* Fix import in project base to named import ([d1bf26a](https://github.com/kubeframe/kubeframe/commit/d1bf26a7e01d4ec373ae1f2682f5ad4dc52c9df8))
* Fix k8s import in factory ([8fedf96](https://github.com/kubeframe/kubeframe/commit/8fedf966f9d242335ed15b5b2176c95214edfe36))
* Only include dist directory in published package ([f8e480e](https://github.com/kubeframe/kubeframe/commit/f8e480ee73b12fe4be3d78e79bcf6aa20715818b))

## [0.4.5](https://github.com/kubeframe/kubeframe/compare/cli-v0.4.4...cli-v0.4.5) (2025-02-23)


### Fixes

* Dependency overrides, include CRD example ([536930d](https://github.com/kubeframe/kubeframe/commit/536930da09dfccfc7374eaa7e4e1564e0ef23cd8))

## [0.4.4](https://github.com/kubeframe/kubeframe/compare/cli-v0.4.3...cli-v0.4.4) (2025-02-22)


### Fixes

* CRD imports and make k8s peerDependency ([920f985](https://github.com/kubeframe/kubeframe/commit/920f985b36c9ce9ced17911e478efc2e01d5b56c))

## [0.4.3](https://github.com/kubeframe/kubeframe/compare/cli-v0.4.2...cli-v0.4.3) (2025-02-21)


### Fixes

* Export decl was removed accidentally ([9911817](https://github.com/kubeframe/kubeframe/commit/9911817544a3b5625ed5f9a492c186d0c19e9c05))

## [0.4.2](https://github.com/kubeframe/kubeframe/compare/cli-v0.4.1...cli-v0.4.2) (2025-02-21)


### Fixes

* Fix exports so that all classes and interfaces get exported from lowest directories ([5041b94](https://github.com/kubeframe/kubeframe/commit/5041b94f220f89ede2ea071146c12a4e773c5c0d))

## [0.4.1](https://github.com/kubeframe/kubeframe/compare/cli-v0.4.0...cli-v0.4.1) (2025-02-21)


### Fixes

* Exports was missing from package.json ([c2cf926](https://github.com/kubeframe/kubeframe/commit/c2cf9266a0d962a3ce308dfcf3e402ecd58fcb59))

## [0.4.0](https://github.com/kubeframe/kubeframe/compare/cli-v0.3.3...cli-v0.4.0) (2025-02-21)


### ⚠ BREAKING CHANGES

* Improved importing flow

### Features

* Improved importing flow ([85cd5c0](https://github.com/kubeframe/kubeframe/commit/85cd5c03e007f58fe11018436043ad5064d0b515))

## [0.3.3](https://github.com/kubeframe/kubeframe/compare/cli-v0.3.2...cli-v0.3.3) (2025-02-20)


### Fixes

* Add info to package.json ([cfd8a1c](https://github.com/kubeframe/kubeframe/commit/cfd8a1ce08242609e5d750ed4db21c1e8d47d7e6))

## [0.3.2](https://github.com/kubeframe/kubeframe/compare/cli-v0.3.1...cli-v0.3.2) (2025-02-19)


### Fixes

* Split project_base main.ts into two to support library creation out of the box this way ApplicationFrame can be imported without running app ([47b5ce7](https://github.com/kubeframe/kubeframe/commit/47b5ce7a58a409aa93186f88ec48d7d64d3d54c1))

## [0.3.1](https://github.com/kubeframe/kubeframe/compare/cli-v0.3.0...cli-v0.3.1) (2025-02-18)


### Bug Fixes

* Require node 22 and remove logs from project base ([411f817](https://github.com/kubeframe/kubeframe/commit/411f81723c47c1a00aa39db71c733a3dc46d3f5b))

## [0.3.0](https://github.com/kubeframe/kubeframe/compare/cli-v0.2.1...cli-v0.3.0) (2025-02-18)


### Features

* CRD factories, create project improvements, helm export ([5fa4331](https://github.com/kubeframe/kubeframe/commit/5fa433106b7419f78633bfa9e59e9d03598e254e))

## [0.2.1](https://github.com/kubeframe/kubeframe/compare/cli-v0.2.0...cli-v0.2.1) (2025-02-17)


### Bug Fixes

* Create individual assignments for properties in CRD ctor, pass GH_TOKEN to create PR call ([af37d2c](https://github.com/kubeframe/kubeframe/commit/af37d2ca135edd9eec9b03fa833c0e724d9c47c4))

## [0.2.0](https://github.com/kubeframe/kubeframe/compare/cli-v0.1.8...cli-v0.2.0) (2025-02-16)


### Features

* Convert to module and add create-project command to cli ([6960eaf](https://github.com/kubeframe/kubeframe/commit/6960eaf0b3383077338e2d11ef039d2f3793cae9))

## [0.1.8](https://github.com/kubeframe/kubeframe/compare/cli-v0.1.7...cli-v0.1.8) (2025-02-16)


### Bug Fixes

* Add version.ts file containing k8s version for which package was generated ([ae495d4](https://github.com/kubeframe/kubeframe/commit/ae495d4a785255f41d00227c5a34efe6094e9cc2))

## [0.1.7](https://github.com/kubeframe/kubeframe/compare/cli-v0.1.6...cli-v0.1.7) (2025-02-16)


### Bug Fixes

* Fix openapi generator execution when using npx ([ade51b4](https://github.com/kubeframe/kubeframe/commit/ade51b4ea538ea1b6c3b39e5fc4956863431cb26))

## [0.1.6](https://github.com/kubeframe/kubeframe/compare/cli-v0.1.5...cli-v0.1.6) (2025-02-16)


### Bug Fixes

* Use dependency version and package version for k8s packages from cli package.json ([4214af9](https://github.com/kubeframe/kubeframe/commit/4214af963d60fe34608344169ed7008a15cd5cf9))

## [0.1.5](https://github.com/kubeframe/kubeframe/compare/cli-v0.1.4...cli-v0.1.5) (2025-02-16)


### Bug Fixes

* Trigger release ([e0cbd57](https://github.com/kubeframe/kubeframe/commit/e0cbd57f9d81bc69093443247aba89147d6d38a2))

## [0.1.4](https://github.com/kubeframe/kubeframe/compare/cli-v0.1.3...cli-v0.1.4) (2025-02-16)


### Bug Fixes

* Debug add toJSON ([0c669e0](https://github.com/kubeframe/kubeframe/commit/0c669e03adc0100ca821b532f8da17af4fdb15ff))

## [0.1.3](https://github.com/kubeframe/kubeframe/compare/cli-v0.1.2...cli-v0.1.3) (2025-02-16)


### Bug Fixes

* Debug release ([2107d64](https://github.com/kubeframe/kubeframe/commit/2107d645cc095aadc609da577a429623f67c58b0))

## [0.1.2](https://github.com/kubeframe/kubeframe/compare/cli-v0.1.1...cli-v0.1.2) (2025-02-16)


### Bug Fixes

* Trigger release ([936b56b](https://github.com/kubeframe/kubeframe/commit/936b56bba2dfe60128886f97d61e0520a4c950ba))

## [0.1.1](https://github.com/kubeframe/kubeframe/compare/cli-v0.1.0...cli-v0.1.1) (2025-02-16)


### Bug Fixes

* Trigger cli release ([0ce6a7f](https://github.com/kubeframe/kubeframe/commit/0ce6a7fb6cda252240e45cc6b6ff958b78d35c8a))
* Trigger release for cli ([374ee05](https://github.com/kubeframe/kubeframe/commit/374ee05f445c0a32846cfce8660071cf1cfd072e))

## [0.1.0](https://github.com/kubeframe/kubeframe/compare/cli-v0.1.0...cli-v0.1.0) (2025-02-16)


### Bug Fixes

* Trigger cli release ([0ce6a7f](https://github.com/kubeframe/kubeframe/commit/0ce6a7fb6cda252240e45cc6b6ff958b78d35c8a))

## 0.1.0 (2025-02-16)


### Bug Fixes

* Remove debug log line ([c017f4e](https://github.com/kubeframe/kubeframe/commit/c017f4e1d6db7ce4d151bb9130b30a6d96808663))
* Use https to clone ([a2eb0a5](https://github.com/kubeframe/kubeframe/commit/a2eb0a534e006cdbb91fc9c8d4e905853a529e91))
