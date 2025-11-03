# Changelog

## [1.0.3](https://github.com/kubeframe/kubeframe/compare/v1.0.2...v1.0.3) (2025-11-03)


### Bug Fixes

* Fix package name setting ([9a627c0](https://github.com/kubeframe/kubeframe/commit/9a627c09704658cccd63ee56bab6caa5f9b656da))

## [1.0.2](https://github.com/kubeframe/kubeframe/compare/v1.0.1...v1.0.2) (2025-11-03)


### Bug Fixes

* Deps install missing ([9c63aed](https://github.com/kubeframe/kubeframe/commit/9c63aed44d3e96e35310063aabf5b950250eb360))

## [1.0.1](https://github.com/kubeframe/kubeframe/compare/v1.0.0...v1.0.1) (2025-11-03)


### Bug Fixes

* Checkout was done too late ([3a5f3b7](https://github.com/kubeframe/kubeframe/commit/3a5f3b78ce7ea380b1a7a9acc5e7b739bc329d7d))

## 1.0.0 (2025-11-03)


### ⚠ BREAKING CHANGES

* Improved importing flow

### Features

* Add manifest back ([0790e4c](https://github.com/kubeframe/kubeframe/commit/0790e4c835a4f3e63b6e9266ecea851430fdc957))
* Convert to module and add create-project command to cli ([6960eaf](https://github.com/kubeframe/kubeframe/commit/6960eaf0b3383077338e2d11ef039d2f3793cae9))
* CRD factories, create project improvements, helm export ([5fa4331](https://github.com/kubeframe/kubeframe/commit/5fa433106b7419f78633bfa9e59e9d03598e254e))
* Improved importing flow ([85cd5c0](https://github.com/kubeframe/kubeframe/commit/85cd5c03e007f58fe11018436043ad5064d0b515))
* Revive project ([2232d7c](https://github.com/kubeframe/kubeframe/commit/2232d7c76df55ccc1c78774f66782ad1f6af1287))
* Simplify k8s importing and provide single entry to all files and include proper types export ([fc8f235](https://github.com/kubeframe/kubeframe/commit/fc8f2350bc6cb4d238c527f7d79f46ebe44f9fac))
* Start new release ([d566cc9](https://github.com/kubeframe/kubeframe/commit/d566cc9e13bbbc02738deddaff3559247696997d))
* Use simple release mode ([6a64636](https://github.com/kubeframe/kubeframe/commit/6a6463660e79c3a699e1112a4933dfb4aa5ee780))


### Bug Fixes

* Add . package also ([9b0390b](https://github.com/kubeframe/kubeframe/commit/9b0390bb64508963cd5bbe874d96489c93fe7ded))
* Add first test for cli ([7d23c58](https://github.com/kubeframe/kubeframe/commit/7d23c58ed4a25a8b4acc9d304c525d5c84ba2e29))
* Add index.ts for base dir, its not generated anymore ([f9a76e5](https://github.com/kubeframe/kubeframe/commit/f9a76e570ea24b55eb5f617c115c71d5ef3d2e3f))
* Add index.ts update lock ([beb8ccb](https://github.com/kubeframe/kubeframe/commit/beb8ccbbc4b7df03e57e03da1c9caab7d96d8fa4))
* Add info to package.json ([cfd8a1c](https://github.com/kubeframe/kubeframe/commit/cfd8a1ce08242609e5d750ed4db21c1e8d47d7e6))
* Add tests to exclude so it won't get compiled into dist ([72e6437](https://github.com/kubeframe/kubeframe/commit/72e643722aa9929c7f47916b6d73c1273f2cbc1a))
* Add version ([c8e943d](https://github.com/kubeframe/kubeframe/commit/c8e943d2762b4d7b3a8b50405dde6dbd41e94999))
* Add version.ts file containing k8s version for which package was generated ([ae495d4](https://github.com/kubeframe/kubeframe/commit/ae495d4a785255f41d00227c5a34efe6094e9cc2))
* CRD imports and make k8s peerDependency ([920f985](https://github.com/kubeframe/kubeframe/commit/920f985b36c9ce9ced17911e478efc2e01d5b56c))
* CRDs example ([3fd1d76](https://github.com/kubeframe/kubeframe/commit/3fd1d7638b2545f231af7cc9651c642af1f8083d))
* Create individual assignments for properties in CRD ctor, pass GH_TOKEN to create PR call ([af37d2c](https://github.com/kubeframe/kubeframe/commit/af37d2ca135edd9eec9b03fa833c0e724d9c47c4))
* Debug add toJSON ([0c669e0](https://github.com/kubeframe/kubeframe/commit/0c669e03adc0100ca821b532f8da17af4fdb15ff))
* Debug release ([2107d64](https://github.com/kubeframe/kubeframe/commit/2107d645cc095aadc609da577a429623f67c58b0))
* Dependency overrides, include CRD example ([536930d](https://github.com/kubeframe/kubeframe/commit/536930da09dfccfc7374eaa7e4e1564e0ef23cd8))
* Example missing crds.ts file ([b06e3a5](https://github.com/kubeframe/kubeframe/commit/b06e3a51b98b78190113650983a21365fef91757))
* Export decl was removed accidentally ([9911817](https://github.com/kubeframe/kubeframe/commit/9911817544a3b5625ed5f9a492c186d0c19e9c05))
* Export version ([0cbe42f](https://github.com/kubeframe/kubeframe/commit/0cbe42f296bf29543229c4361345f474b9486710))
* Exports was missing from package.json ([c2cf926](https://github.com/kubeframe/kubeframe/commit/c2cf9266a0d962a3ce308dfcf3e402ecd58fcb59))
* Fix exports so that all classes and interfaces get exported from lowest directories ([5041b94](https://github.com/kubeframe/kubeframe/commit/5041b94f220f89ede2ea071146c12a4e773c5c0d))
* Fix import in project base to named import ([d1bf26a](https://github.com/kubeframe/kubeframe/commit/d1bf26a7e01d4ec373ae1f2682f5ad4dc52c9df8))
* Fix imports to align with new exports ([498435e](https://github.com/kubeframe/kubeframe/commit/498435ea6ca719070a97af3324f6b0a10c5c56ef))
* Fix issues with latest k8s package ([0ae6c12](https://github.com/kubeframe/kubeframe/commit/0ae6c129083d41c52f2e425b330111f9aa4e2b04))
* Fix k8s import in factory ([8fedf96](https://github.com/kubeframe/kubeframe/commit/8fedf966f9d242335ed15b5b2176c95214edfe36))
* Fix openapi generator execution when using npx ([ade51b4](https://github.com/kubeframe/kubeframe/commit/ade51b4ea538ea1b6c3b39e5fc4956863431cb26))
* Fix package json and include npm install in deps update ([49b3c07](https://github.com/kubeframe/kubeframe/commit/49b3c07cd908f28fe63e61a8da94fb300bf3d32e))
* K8s imports in core ([859c521](https://github.com/kubeframe/kubeframe/commit/859c5212a1829193efeb2b925855cfc4aa6dcaa9))
* Make publish cli depend on release ([cbeeef3](https://github.com/kubeframe/kubeframe/commit/cbeeef328cb466b047ec849647ca67868752c972))
* Only include dist directory in published package ([f8e480e](https://github.com/kubeframe/kubeframe/commit/f8e480ee73b12fe4be3d78e79bcf6aa20715818b))
* preBuild was not called for sub frames, add tests ([860f494](https://github.com/kubeframe/kubeframe/commit/860f494b67f55aeea89c1b03d9f2e91200538c92))
* Release core job ([81fa9f2](https://github.com/kubeframe/kubeframe/commit/81fa9f2510dfd475b10e3dc544f967f9db76399f))
* Remove build-k8s and add test generation for build-cli ([59317f6](https://github.com/kubeframe/kubeframe/commit/59317f6d8c875e6c011a870b218e8fe5f4bf8439))
* Remove debug log ([ab00662](https://github.com/kubeframe/kubeframe/commit/ab00662bbc194c470a158361d1594f14126662df))
* Remove debug log line ([c017f4e](https://github.com/kubeframe/kubeframe/commit/c017f4e1d6db7ce4d151bb9130b30a6d96808663))
* Remove duplicate running of build, build should called on topmost frame only ([b232142](https://github.com/kubeframe/kubeframe/commit/b232142413f058edc428682250b14a76b9cec2cb))
* Remove release-as ([00e2165](https://github.com/kubeframe/kubeframe/commit/00e216598c3bf282708fab8cca7c54797484607e))
* Require node 22 and remove logs from project base ([411f817](https://github.com/kubeframe/kubeframe/commit/411f81723c47c1a00aa39db71c733a3dc46d3f5b))
* Split project_base main.ts into two to support library creation out of the box this way ApplicationFrame can be imported without running app ([47b5ce7](https://github.com/kubeframe/kubeframe/commit/47b5ce7a58a409aa93186f88ec48d7d64d3d54c1))
* Test generate PRs and publish cli during release ([2830a99](https://github.com/kubeframe/kubeframe/commit/2830a99e2f0fe0f5b373626a4f67599aa0b53aaa))
* Test release ([982afdc](https://github.com/kubeframe/kubeframe/commit/982afdc4745bdd851a6ebcb2ced52d626b0c2935))
* Trigger cli release ([0ce6a7f](https://github.com/kubeframe/kubeframe/commit/0ce6a7fb6cda252240e45cc6b6ff958b78d35c8a))
* Trigger release ([e0cbd57](https://github.com/kubeframe/kubeframe/commit/e0cbd57f9d81bc69093443247aba89147d6d38a2))
* Trigger release ([936b56b](https://github.com/kubeframe/kubeframe/commit/936b56bba2dfe60128886f97d61e0520a4c950ba))
* Trigger release for cli ([374ee05](https://github.com/kubeframe/kubeframe/commit/374ee05f445c0a32846cfce8660071cf1cfd072e))
* Try keep releases in sync ([b721fcf](https://github.com/kubeframe/kubeframe/commit/b721fcf3d5efbdd21d795521ba58449c00da9b72))
* Try keeping versions in sync ([603ef8e](https://github.com/kubeframe/kubeframe/commit/603ef8e108a70645ce0a2b74e56c350de48afb38))
* Update docs and trigger release ([640a0a2](https://github.com/kubeframe/kubeframe/commit/640a0a24cd24bb5c7a5e6c1d6bdea6f4b49e104d))
* Update docs and trigger release ([942f555](https://github.com/kubeframe/kubeframe/commit/942f5558a91de9b44d93e43a3353f521fb372e1d))
* Use dependency version and package version for k8s packages from cli package.json ([4214af9](https://github.com/kubeframe/kubeframe/commit/4214af963d60fe34608344169ed7008a15cd5cf9))
* Use https to clone ([a2eb0a5](https://github.com/kubeframe/kubeframe/commit/a2eb0a534e006cdbb91fc9c8d4e905853a529e91))
* Use namespaced import for crds ([71991dc](https://github.com/kubeframe/kubeframe/commit/71991dc207c8b9ca1b7f8b63e2ac875c85ae3913))
* Use simple release again ([02d8a83](https://github.com/kubeframe/kubeframe/commit/02d8a8389969cc7d7188faa626026f128b186dfd))
