# Changelog

## [0.4.4](https://github.com/kubeframe/kubeframe/compare/core-v0.4.3...core-v0.4.4) (2025-03-08)


### Fixes

* Add tests to exclude so it won't get compiled into dist ([72e6437](https://github.com/kubeframe/kubeframe/commit/72e643722aa9929c7f47916b6d73c1273f2cbc1a))
* preBuild was not called for sub frames, add tests ([860f494](https://github.com/kubeframe/kubeframe/commit/860f494b67f55aeea89c1b03d9f2e91200538c92))

## [0.4.3](https://github.com/kubeframe/kubeframe/compare/core-v0.4.2...core-v0.4.3) (2025-03-01)


### Fixes

* Remove duplicate running of build, build should called on topmost frame only ([b232142](https://github.com/kubeframe/kubeframe/commit/b232142413f058edc428682250b14a76b9cec2cb))

## [0.4.2](https://github.com/kubeframe/kubeframe/compare/core-v0.4.1...core-v0.4.2) (2025-02-23)


### Dependencies

* Update core package @kubeframe/k8s dependency to @kubeframe/k8s-1.32:0.5.2 ([04d191f](https://github.com/kubeframe/kubeframe/commit/04d191fb928d9bea76195c0735e6bc756d37be40))

## [0.4.1](https://github.com/kubeframe/kubeframe/compare/core-v0.4.0...core-v0.4.1) (2025-02-23)


### Fixes

* K8s imports in core ([859c521](https://github.com/kubeframe/kubeframe/commit/859c5212a1829193efeb2b925855cfc4aa6dcaa9))


### Dependencies

* Update core package @kubeframe/k8s dependency to @kubeframe/k8s-1.32:0.5.1 ([40d70ad](https://github.com/kubeframe/kubeframe/commit/40d70ad37c5db80a300fa9388e54a96c09e31642))

## [0.4.0](https://github.com/kubeframe/kubeframe/compare/core-v0.3.5...core-v0.4.0) (2025-02-23)


### Features

* Simplify k8s importing and provide single entry to all files and include proper types export ([fc8f235](https://github.com/kubeframe/kubeframe/commit/fc8f2350bc6cb4d238c527f7d79f46ebe44f9fac))

## [0.3.5](https://github.com/kubeframe/kubeframe/compare/core-v0.3.4...core-v0.3.5) (2025-02-23)


### Dependencies

* Update core package @kubeframe/k8s dependency to @kubeframe/k8s-1.32:0.4.5 ([4f7183e](https://github.com/kubeframe/kubeframe/commit/4f7183e231b988696611816aa42fe302232b99a9))

## [0.3.4](https://github.com/kubeframe/kubeframe/compare/core-v0.3.3...core-v0.3.4) (2025-02-23)


### Fixes

* Dependency overrides, include CRD example ([536930d](https://github.com/kubeframe/kubeframe/commit/536930da09dfccfc7374eaa7e4e1564e0ef23cd8))


### Dependencies

* Manually update ([2bc4218](https://github.com/kubeframe/kubeframe/commit/2bc421807bd9589a234be9ba929ed04468560e47))

## [0.3.3](https://github.com/kubeframe/kubeframe/compare/core-v0.3.2...core-v0.3.3) (2025-02-22)


### Fixes

* CRD imports and make k8s peerDependency ([920f985](https://github.com/kubeframe/kubeframe/commit/920f985b36c9ce9ced17911e478efc2e01d5b56c))

## [0.3.2](https://github.com/kubeframe/kubeframe/compare/core-v0.3.1...core-v0.3.2) (2025-02-21)


### Fixes

* Fix imports to align with new exports ([498435e](https://github.com/kubeframe/kubeframe/commit/498435ea6ca719070a97af3324f6b0a10c5c56ef))

## [0.3.1](https://github.com/kubeframe/kubeframe/compare/core-v0.3.0...core-v0.3.1) (2025-02-21)


### Dependencies

* Update core package @kubeframe/k8s dependency to @kubeframe/k8s-1.32:0.4.0 ([0f420fb](https://github.com/kubeframe/kubeframe/commit/0f420fb52e2b1fb895f8c8b5b141dbfc28b0ff04))

## [0.3.0](https://github.com/kubeframe/kubeframe/compare/core-v0.2.3...core-v0.3.0) (2025-02-21)


### ⚠ BREAKING CHANGES

* Improved importing flow

### Features

* Improved importing flow ([85cd5c0](https://github.com/kubeframe/kubeframe/commit/85cd5c03e007f58fe11018436043ad5064d0b515))

## [0.2.3](https://github.com/kubeframe/kubeframe/compare/core-v0.2.2...core-v0.2.3) (2025-02-20)


### Fixes

* Fix package json and include npm install in deps update ([49b3c07](https://github.com/kubeframe/kubeframe/commit/49b3c07cd908f28fe63e61a8da94fb300bf3d32e))

## [0.2.2](https://github.com/kubeframe/kubeframe/compare/core-v0.2.1...core-v0.2.2) (2025-02-20)


### Fixes

* Add index.ts update lock ([beb8ccb](https://github.com/kubeframe/kubeframe/commit/beb8ccbbc4b7df03e57e03da1c9caab7d96d8fa4))


### Dependencies

* Update core package @kubeframe/k8s dependency to @kubeframe/k8s-1.32:0.3.3 ([5e05c50](https://github.com/kubeframe/kubeframe/commit/5e05c50e0ea9cf09c7abab0bf1224af4092ec422))

## [0.2.1](https://github.com/kubeframe/kubeframe/compare/core-v0.2.0...core-v0.2.1) (2025-02-20)


### Fixes

* Add info to package.json ([cfd8a1c](https://github.com/kubeframe/kubeframe/commit/cfd8a1ce08242609e5d750ed4db21c1e8d47d7e6))

## [0.2.0](https://github.com/kubeframe/kubeframe/compare/core-v0.1.2...core-v0.2.0) (2025-02-18)


### Features

* CRD factories, create project improvements, helm export ([5fa4331](https://github.com/kubeframe/kubeframe/commit/5fa433106b7419f78633bfa9e59e9d03598e254e))

## [0.1.2](https://github.com/kubeframe/kubeframe/compare/core-v0.1.1...core-v0.1.2) (2025-02-17)


### Bug Fixes

* Fix issues with latest k8s package ([0ae6c12](https://github.com/kubeframe/kubeframe/commit/0ae6c129083d41c52f2e425b330111f9aa4e2b04))

## [0.1.1](https://github.com/kubeframe/kubeframe/compare/core-v0.1.0...core-v0.1.1) (2025-02-17)


### Bug Fixes

* Remove debug log ([ab00662](https://github.com/kubeframe/kubeframe/commit/ab00662bbc194c470a158361d1594f14126662df))

## 0.1.0 (2025-02-16)


### Features

* Convert to module and add create-project command to cli ([6960eaf](https://github.com/kubeframe/kubeframe/commit/6960eaf0b3383077338e2d11ef039d2f3793cae9))
