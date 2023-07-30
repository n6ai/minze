# Changelog

## [1.8.1](https://github.com/n6ai/minze/compare/minze-v1.8.0...minze-v1.8.1) (2023-07-30)


### Bug Fixes

* auto-export dynamically generated exportparts ([476bc45](https://github.com/n6ai/minze/commit/476bc457c4ce41d708861e14d40f24fa8b395035))

## [1.8.0](https://github.com/n6ai/minze/compare/minze-v1.7.3...minze-v1.8.0) (2023-07-30)


### Features

* automatically exportparts via option toggle ([54fc8ae](https://github.com/n6ai/minze/commit/54fc8aead61941b7094f0a325ea40ba571854231))

## [1.7.3](https://github.com/n6ai/minze/compare/minze-v1.7.2...minze-v1.7.3) (2023-07-30)


### Bug Fixes

* dispatch events through shadow dom boundary ([af06d20](https://github.com/n6ai/minze/commit/af06d205c5499d6375dd551743939d8d7afd5fe7))

## [1.7.2](https://github.com/n6ai/minze/compare/minze-v1.7.1...minze-v1.7.2) (2023-07-30)


### Bug Fixes

* **patching:** don't remove dynamically set attrs ([25256e3](https://github.com/n6ai/minze/commit/25256e3ed5c5850fa1dba56a2be9317b7ade0f77))
* use previousCachedTemplate when patching ([17bc37f](https://github.com/n6ai/minze/commit/17bc37f9938de34c698604471a151732eb47ef42))

## [1.7.1](https://github.com/n6ai/minze/compare/minze-v1.7.0...minze-v1.7.1) (2023-07-29)


### Bug Fixes

* layers directive for css reset, no-reset attr ([942a24e](https://github.com/n6ai/minze/commit/942a24e456bbfed3a1952359ed83de7515f792eb))

## [1.7.0](https://github.com/n6ai/minze/compare/minze-v1.6.0...minze-v1.7.0) (2023-07-27)


### Features

* auto-convert number and JSON-parsable attrs ([306efc7](https://github.com/n6ai/minze/commit/306efc7a0471533bf973bbcc3f4102b309e3f219))


### Bug Fixes

* de-duplicate template events ([8292ee8](https://github.com/n6ai/minze/commit/8292ee88cc91e3adc560847c2f008053674b821f))

## [1.6.0](https://github.com/n6ai/minze/compare/minze-v1.5.1...minze-v1.6.0) (2023-07-26)


### Features

* add support for defining in-template [@events](https://github.com/events) ([#214](https://github.com/n6ai/minze/issues/214)) ([d94f545](https://github.com/n6ai/minze/commit/d94f545affe85e20910ef4909ddbafe1bf4b5dbb))

## [1.5.1](https://github.com/n6ai/minze/compare/minze-v1.5.0...minze-v1.5.1) (2023-07-25)


### Bug Fixes

* skip defining element if it's already defined ([b800af8](https://github.com/n6ai/minze/commit/b800af8b87d5617f6f4c4a5a8001e42ef0246183))

## [1.5.0](https://github.com/n6ai/minze/compare/minze-v1.4.2...minze-v1.5.0) (2023-07-23)


### Features

* add css reset styling and option to disable ([614f0f6](https://github.com/n6ai/minze/commit/614f0f649b7e90acd247a6a7c09e7cb2725be425))

## [1.4.2](https://github.com/n6ai/minze/compare/minze-v1.4.1...minze-v1.4.2) (2023-07-22)


### Bug Fixes

* remove typescript index signature ([df431c3](https://github.com/n6ai/minze/commit/df431c36a466cb04da0c1a38464e2bb4798796a7))

## [1.4.1](https://github.com/n6ai/minze/compare/minze-v1.4.0...minze-v1.4.1) (2023-07-12)


### Bug Fixes

* remove redundand  function arg for rerender ([f3e7682](https://github.com/n6ai/minze/commit/f3e7682fb389ae4742041ca76cb2f2109eaea6cb))

## [1.4.0](https://github.com/n6ai/minze/compare/minze-v1.3.2...minze-v1.4.0) (2023-07-10)


### Features

* add slotted method to MinzeElement ([8606e2a](https://github.com/n6ai/minze/commit/8606e2a2bdcca49d560c136cd1f8fe4508365fb2))

## [1.3.2](https://github.com/n6ai/minze/compare/minze-v1.3.1...minze-v1.3.2) (2023-07-06)


### Bug Fixes

* add dispatch and deprecation warning for cast ([5d51fb9](https://github.com/n6ai/minze/commit/5d51fb95e530143421680d95330e6ffb92f99fc1))

## [1.3.1](https://github.com/n6ai/minze/compare/minze-v1.3.0...minze-v1.3.1) (2023-07-05)


### Bug Fixes

* check if function before running define ([74c9da5](https://github.com/n6ai/minze/commit/74c9da5182cc39ac3fe30e26ddf6190b2a22da63))
* vite glob eager module type ([710224c](https://github.com/n6ai/minze/commit/710224cde61892fb1fe07c95407f26ca69b4cef0))

## [1.3.0](https://github.com/n6ai/minze/compare/minze-v1.2.0...minze-v1.3.0) (2023-07-04)


### Features

* deprecate umd build use esm as default ([c988e63](https://github.com/n6ai/minze/commit/c988e6360468db5cdd1eff9a902e7f18a0e2ee85))

## [1.2.0](https://github.com/n6ai/minze/compare/minze-v1.1.2...minze-v1.2.0) (2023-07-01)


### Features

* add defineAll loading for vite glob imports ([9c1afd7](https://github.com/n6ai/minze/commit/9c1afd76d5292267527d2904d78ef812f6482e9f))
* add isMinzeElement property ([31f6838](https://github.com/n6ai/minze/commit/31f68386f4631867324d9d23c16f11401c778bae))
* make version a static property ([996a853](https://github.com/n6ai/minze/commit/996a853f90b2b8baf7434ee4077b4e3acca49968))
* use defineAll for vite glob eager import ([8b20085](https://github.com/n6ai/minze/commit/8b20085d7fb4dc7f1f3ef7086de5834dd7dc2570))

## [1.1.2](https://github.com/n6ai/minze/compare/minze-v1.1.1...minze-v1.1.2) (2023-06-28)


### Bug Fixes

* clear cached template when removed from dom ([dd874f1](https://github.com/n6ai/minze/commit/dd874f172abe492c13a4f367a6678af1c268719b))

## [1.1.1](https://github.com/n6ai/minze/compare/minze-v1.1.0...minze-v1.1.1) (2023-01-26)


### Bug Fixes

* convert attributes without values to true ([c87a51f](https://github.com/n6ai/minze/commit/c87a51f57edbee94b788caf31b0f62e7c933090d))


### Miscellaneous

* manual release ([f57cbb0](https://github.com/n6ai/minze/commit/f57cbb0ac136f3f5876f44f333c9c4735b3b2667))

## [1.1.0](https://github.com/n6ai/minze/compare/minze-v1.0.3...minze-v1.1.0) (2022-12-23)

## [1.0.3](https://github.com/n6ai/minze/compare/v1.0.2...v1.0.3) (2022-02-02)

## [1.0.2](https://github.com/n6ai/minze/compare/v1.0.1...v1.0.2) (2022-01-23)


### Bug Fixes

* add null type to attribute change hook args ([3ee9ed4](https://github.com/n6ai/minze/commit/3ee9ed4758eda250e98b8addee658c615efc862f))

## [1.0.1](https://github.com/n6ai/minze/compare/v1.0.0...v1.0.1) (2022-01-22)


### Bug Fixes

* remove TemplateStringsArray return type ([7bd82f9](https://github.com/n6ai/minze/commit/7bd82f9a4e28260ba548fda4cb130b334e4e94b0))
