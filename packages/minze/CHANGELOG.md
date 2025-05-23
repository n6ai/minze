# Changelog

## [1.10.2](https://github.com/sergejcodes/minze/compare/minze-v1.10.1...minze-v1.10.2) (2025-05-23)


### Miscellaneous

* update repo ([6674684](https://github.com/sergejcodes/minze/commit/667468402fbec2b3ccae6e1e7bed1587a0e696c5))

## [1.10.1](https://github.com/sergejcodes/minze/compare/minze-v1.10.0...minze-v1.10.1) (2023-11-28)


### Bug Fixes

* event shorthand regex breaking events if attribute value matches event shorthand writing ([#268](https://github.com/sergejcodes/minze/issues/268)) ([432169e](https://github.com/sergejcodes/minze/commit/432169e4e519967faee52fc7f2c589b627c7fc88))
* on:events regex notation ([71d53ec](https://github.com/sergejcodes/minze/commit/71d53ec0651f02f4fc89c219a9db3927c5e6efe2))

## [1.10.0](https://github.com/sergejcodes/minze/compare/minze-v1.9.2...minze-v1.10.0) (2023-08-30)


### Features

* use view transitions api when enabled through options ([#246](https://github.com/sergejcodes/minze/issues/246)) ([94d5723](https://github.com/sergejcodes/minze/commit/94d57234e3c0b59d5d9a62688a74daf5b73d3d4e))


### Bug Fixes

* match attributes without quotation marks ([1fa9a17](https://github.com/sergejcodes/minze/commit/1fa9a1717bd8f3d2208488f2e4c867ff9837c121))

## [1.9.2](https://github.com/sergejcodes/minze/compare/minze-v1.9.1...minze-v1.9.2) (2023-08-21)


### Bug Fixes

* add `on:` event notation for template events ([f6fefd5](https://github.com/sergejcodes/minze/commit/f6fefd57d7d1fd5eb72e89e4ea57c8053bad687c))
* allow any typescript return type in hooks ([8e5f079](https://github.com/sergejcodes/minze/commit/8e5f079336751f171ab14a099c87a240a01fab23))
* insert css via adoptedStyleSheets ([2790d00](https://github.com/sergejcodes/minze/commit/2790d0056d16acc3eeb80f5b3eaedeedb53d48a8))
* log internal html and css properties on debug ([6f50c46](https://github.com/sergejcodes/minze/commit/6f50c463796697c40a8fd9abc97ecd2ef9c9cad4))

## [1.9.1](https://github.com/sergejcodes/minze/compare/minze-v1.9.0...minze-v1.9.1) (2023-08-19)


### Bug Fixes

* conditional defineAll module-map check ([80df7cd](https://github.com/sergejcodes/minze/commit/80df7cd0712040f1d134c4bd38be2b2b6222e578))

## [1.9.0](https://github.com/sergejcodes/minze/compare/minze-v1.8.2...minze-v1.9.0) (2023-08-17)


### Features

* add debug option, name & dashName properties ([#231](https://github.com/sergejcodes/minze/issues/231)) ([171007a](https://github.com/sergejcodes/minze/commit/171007ac3eb66bff04ee719380861ae76ef53afc))
* add emojis to debug log ([a0f88e0](https://github.com/sergejcodes/minze/commit/a0f88e0b3797ab3bca256786931e34b4421929c2))
* add log method for debugging ([ee801cd](https://github.com/sergejcodes/minze/commit/ee801cdbd6cbcfb5031a4a2bc11f5c1dc850b7e9))
* add observedAttributes to debug log ([71527c4](https://github.com/sergejcodes/minze/commit/71527c47607954f3e9e8ea10b3c4aed0d50de60e))
* add shorthand at-events notation ([a9d5f3a](https://github.com/sergejcodes/minze/commit/a9d5f3af35b97f590b0ff0b7e281d2af8a15bb24))
* allow any events via ts in callbacks ([9aa54d8](https://github.com/sergejcodes/minze/commit/9aa54d8d650e61139deecb67d39d15bb8486eaaf))
* allow BroadcastChannel as an event target ([30020e4](https://github.com/sergejcodes/minze/commit/30020e44ecc64a2d7a0e6c8c79528d3e56935aaf))
* auto-bind event callback methods to element ([486f3a7](https://github.com/sergejcodes/minze/commit/486f3a7b39ed16c07ef191be57adec01924e1318))
* deprecate on hooks in favour of after hooks ([c4ddf48](https://github.com/sergejcodes/minze/commit/c4ddf48838c1aaaed03717f3eaf69a9f8a788a7d))
* move debug from an option to a property ([3ddd6a8](https://github.com/sergejcodes/minze/commit/3ddd6a883ed1783183476fb71550dd4dcfe7aaa8))
* simplify the process of defining individual modules from module-maps ([#232](https://github.com/sergejcodes/minze/issues/232)) ([85029dc](https://github.com/sergejcodes/minze/commit/85029dc568a287e3167a8db4674d80aef4749571))
* use a callback paramerter to transform keys ([4ef9949](https://github.com/sergejcodes/minze/commit/4ef9949ee878b351de568f8e08a26b2d896a05a5))


### Bug Fixes

* allow events preventDefault & stopPropagation ([043af20](https://github.com/sergejcodes/minze/commit/043af20bba0ec38875827d539cbfb75126c08b4d))
* bind watch callbacks to component ([12273d2](https://github.com/sergejcodes/minze/commit/12273d277949de49efe7d9fc41bfbd5d409c6886))
* check for null when making objects reactive ([8f59b0c](https://github.com/sergejcodes/minze/commit/8f59b0c45f8e6ae5f773d19e42d9fcb0b145f4dc))
* check if a callback exists before binding ([59e540f](https://github.com/sergejcodes/minze/commit/59e540fe8b857bb890ca8928ce8063aa7e706d81))
* don't consider white space as a part ([0eddc56](https://github.com/sergejcodes/minze/commit/0eddc56248bc089f19d08c9ce7d40d9b7cea190f))
* don't try to merge at-events without matches ([b6c5218](https://github.com/sergejcodes/minze/commit/b6c521896fff81e322953eaf136487eb5e000205))
* escape event target selector string ([a1dee96](https://github.com/sergejcodes/minze/commit/a1dee9630610d0f532b6ea3c671b151523c4c590))
* escape only at-event selectors automatically ([3113402](https://github.com/sergejcodes/minze/commit/31134029d589bc136d70f4d0ad487656efa27fb1))
* exportparts after reactive props initialized ([607aa34](https://github.com/sergejcodes/minze/commit/607aa3425e57c1e8b1909974f0fd6574d86908ca))
* exportparts extraction ([#223](https://github.com/sergejcodes/minze/issues/223)) ([21615d7](https://github.com/sergejcodes/minze/commit/21615d7dcac14acd7e0526b0cb90f0b184323291))
* select at-events with special chars in name ([d078c07](https://github.com/sergejcodes/minze/commit/d078c070b1d850954d39aeb1b1e9e2925beb6192))
* sort exportparts alphabetically ([5948a8e](https://github.com/sergejcodes/minze/commit/5948a8e0c55f09dc2c3296f60f352ad31977901d))

## [1.8.2](https://github.com/sergejcodes/minze/compare/minze-v1.8.1...minze-v1.8.2) (2023-07-30)


### Bug Fixes

* extract all parts, even initially hidden ones ([ab2ddd2](https://github.com/sergejcodes/minze/commit/ab2ddd20ec61d2ae18957a4cbec0b9caa58148a2))

## [1.8.1](https://github.com/sergejcodes/minze/compare/minze-v1.8.0...minze-v1.8.1) (2023-07-30)


### Bug Fixes

* auto-export dynamically generated exportparts ([476bc45](https://github.com/sergejcodes/minze/commit/476bc457c4ce41d708861e14d40f24fa8b395035))

## [1.8.0](https://github.com/sergejcodes/minze/compare/minze-v1.7.3...minze-v1.8.0) (2023-07-30)


### Features

* automatically exportparts via option toggle ([54fc8ae](https://github.com/sergejcodes/minze/commit/54fc8aead61941b7094f0a325ea40ba571854231))

## [1.7.3](https://github.com/sergejcodes/minze/compare/minze-v1.7.2...minze-v1.7.3) (2023-07-30)


### Bug Fixes

* dispatch events through shadow dom boundary ([af06d20](https://github.com/sergejcodes/minze/commit/af06d205c5499d6375dd551743939d8d7afd5fe7))

## [1.7.2](https://github.com/sergejcodes/minze/compare/minze-v1.7.1...minze-v1.7.2) (2023-07-30)


### Bug Fixes

* **patching:** don't remove dynamically set attrs ([25256e3](https://github.com/sergejcodes/minze/commit/25256e3ed5c5850fa1dba56a2be9317b7ade0f77))
* use previousCachedTemplate when patching ([17bc37f](https://github.com/sergejcodes/minze/commit/17bc37f9938de34c698604471a151732eb47ef42))

## [1.7.1](https://github.com/sergejcodes/minze/compare/minze-v1.7.0...minze-v1.7.1) (2023-07-29)


### Bug Fixes

* layers directive for css reset, no-reset attr ([942a24e](https://github.com/sergejcodes/minze/commit/942a24e456bbfed3a1952359ed83de7515f792eb))

## [1.7.0](https://github.com/sergejcodes/minze/compare/minze-v1.6.0...minze-v1.7.0) (2023-07-27)


### Features

* auto-convert number and JSON-parsable attrs ([306efc7](https://github.com/sergejcodes/minze/commit/306efc7a0471533bf973bbcc3f4102b309e3f219))


### Bug Fixes

* de-duplicate template events ([8292ee8](https://github.com/sergejcodes/minze/commit/8292ee88cc91e3adc560847c2f008053674b821f))

## [1.6.0](https://github.com/sergejcodes/minze/compare/minze-v1.5.1...minze-v1.6.0) (2023-07-26)


### Features

* add support for defining in-template [@events](https://github.com/events) ([#214](https://github.com/sergejcodes/minze/issues/214)) ([d94f545](https://github.com/sergejcodes/minze/commit/d94f545affe85e20910ef4909ddbafe1bf4b5dbb))

## [1.5.1](https://github.com/sergejcodes/minze/compare/minze-v1.5.0...minze-v1.5.1) (2023-07-25)


### Bug Fixes

* skip defining element if it's already defined ([b800af8](https://github.com/sergejcodes/minze/commit/b800af8b87d5617f6f4c4a5a8001e42ef0246183))

## [1.5.0](https://github.com/sergejcodes/minze/compare/minze-v1.4.2...minze-v1.5.0) (2023-07-23)


### Features

* add css reset styling and option to disable ([614f0f6](https://github.com/sergejcodes/minze/commit/614f0f649b7e90acd247a6a7c09e7cb2725be425))

## [1.4.2](https://github.com/sergejcodes/minze/compare/minze-v1.4.1...minze-v1.4.2) (2023-07-22)


### Bug Fixes

* remove typescript index signature ([df431c3](https://github.com/sergejcodes/minze/commit/df431c36a466cb04da0c1a38464e2bb4798796a7))

## [1.4.1](https://github.com/sergejcodes/minze/compare/minze-v1.4.0...minze-v1.4.1) (2023-07-12)


### Bug Fixes

* remove redundand  function arg for rerender ([f3e7682](https://github.com/sergejcodes/minze/commit/f3e7682fb389ae4742041ca76cb2f2109eaea6cb))

## [1.4.0](https://github.com/sergejcodes/minze/compare/minze-v1.3.2...minze-v1.4.0) (2023-07-10)


### Features

* add slotted method to MinzeElement ([8606e2a](https://github.com/sergejcodes/minze/commit/8606e2a2bdcca49d560c136cd1f8fe4508365fb2))

## [1.3.2](https://github.com/sergejcodes/minze/compare/minze-v1.3.1...minze-v1.3.2) (2023-07-06)


### Bug Fixes

* add dispatch and deprecation warning for cast ([5d51fb9](https://github.com/sergejcodes/minze/commit/5d51fb95e530143421680d95330e6ffb92f99fc1))

## [1.3.1](https://github.com/sergejcodes/minze/compare/minze-v1.3.0...minze-v1.3.1) (2023-07-05)


### Bug Fixes

* check if function before running define ([74c9da5](https://github.com/sergejcodes/minze/commit/74c9da5182cc39ac3fe30e26ddf6190b2a22da63))
* vite glob eager module type ([710224c](https://github.com/sergejcodes/minze/commit/710224cde61892fb1fe07c95407f26ca69b4cef0))

## [1.3.0](https://github.com/sergejcodes/minze/compare/minze-v1.2.0...minze-v1.3.0) (2023-07-04)


### Features

* deprecate umd build use esm as default ([c988e63](https://github.com/sergejcodes/minze/commit/c988e6360468db5cdd1eff9a902e7f18a0e2ee85))

## [1.2.0](https://github.com/sergejcodes/minze/compare/minze-v1.1.2...minze-v1.2.0) (2023-07-01)


### Features

* add defineAll loading for vite glob imports ([9c1afd7](https://github.com/sergejcodes/minze/commit/9c1afd76d5292267527d2904d78ef812f6482e9f))
* add isMinzeElement property ([31f6838](https://github.com/sergejcodes/minze/commit/31f68386f4631867324d9d23c16f11401c778bae))
* make version a static property ([996a853](https://github.com/sergejcodes/minze/commit/996a853f90b2b8baf7434ee4077b4e3acca49968))
* use defineAll for vite glob eager import ([8b20085](https://github.com/sergejcodes/minze/commit/8b20085d7fb4dc7f1f3ef7086de5834dd7dc2570))

## [1.1.2](https://github.com/sergejcodes/minze/compare/minze-v1.1.1...minze-v1.1.2) (2023-06-28)


### Bug Fixes

* clear cached template when removed from dom ([dd874f1](https://github.com/sergejcodes/minze/commit/dd874f172abe492c13a4f367a6678af1c268719b))

## [1.1.1](https://github.com/sergejcodes/minze/compare/minze-v1.1.0...minze-v1.1.1) (2023-01-26)


### Bug Fixes

* convert attributes without values to true ([c87a51f](https://github.com/sergejcodes/minze/commit/c87a51f57edbee94b788caf31b0f62e7c933090d))


### Miscellaneous

* manual release ([f57cbb0](https://github.com/sergejcodes/minze/commit/f57cbb0ac136f3f5876f44f333c9c4735b3b2667))

## [1.1.0](https://github.com/sergejcodes/minze/compare/minze-v1.0.3...minze-v1.1.0) (2022-12-23)

## [1.0.3](https://github.com/sergejcodes/minze/compare/v1.0.2...v1.0.3) (2022-02-02)

## [1.0.2](https://github.com/sergejcodes/minze/compare/v1.0.1...v1.0.2) (2022-01-23)


### Bug Fixes

* add null type to attribute change hook args ([3ee9ed4](https://github.com/sergejcodes/minze/commit/3ee9ed4758eda250e98b8addee658c615efc862f))

## [1.0.1](https://github.com/sergejcodes/minze/compare/v1.0.0...v1.0.1) (2022-01-22)


### Bug Fixes

* remove TemplateStringsArray return type ([7bd82f9](https://github.com/sergejcodes/minze/commit/7bd82f9a4e28260ba548fda4cb130b334e4e94b0))
