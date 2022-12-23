# Changelog

## [1.1.0](https://github.com/n6ai/minze/compare/minze-v1.0.3...minze-v1.1.0) (2022-12-23)


### Features

* accept module object for defineAll method ([e59f066](https://github.com/n6ai/minze/commit/e59f0666a6056e77775a1b3edc09e9cff85eda54))
* add dashName getter ([8054b71](https://github.com/n6ai/minze/commit/8054b7149fc85f612f1e3ffc4c6bb6356e418080))
* add define method ([a7d047e](https://github.com/n6ai/minze/commit/a7d047e8127cd3df21dea3469cdbffbb9da9feb5))
* add dom patcher ([76c107c](https://github.com/n6ai/minze/commit/76c107c1f02918b82170b30285014f1dfd880ff5))
* add onReactive hook ([95edb4c](https://github.com/n6ai/minze/commit/95edb4c6e2ebfb93d1227b31efcebf9716f67821))
* add render hooks ([8e29c38](https://github.com/n6ai/minze/commit/8e29c38fb253836a123068290a87e8a8ca9ef6a0))
* add syntax highlighting helpers ([4cf226a](https://github.com/n6ai/minze/commit/4cf226a74141efcb32c0c0180d151e9094df7397))
* add type aliases ([33fb32d](https://github.com/n6ai/minze/commit/33fb32d7b5da9f2096a1ebde348b17c77c682601))
* add warnings ([a85890a](https://github.com/n6ai/minze/commit/a85890a607bf9c84a1f76a8f017630e93a25e84a))
* add watchers ([d75265e](https://github.com/n6ai/minze/commit/d75265e10a25b85f672573ae2f6307fa2b2196c8))
* allow shorthand for reactive props and attrs ([7f37e84](https://github.com/n6ai/minze/commit/7f37e8485ec7c38a074f88bfe8a19582d88fd185))
* make all on hooks non-blocking ([7383530](https://github.com/n6ai/minze/commit/7383530c36227cd98a0b61447eefb257422a0b43))
* remove template tagging utils ([f447db2](https://github.com/n6ai/minze/commit/f447db20f42c582b06c8266247636f285d4fd5dd))
* set default host styles ([50d6ca7](https://github.com/n6ai/minze/commit/50d6ca7004dbd800ef93657804058fda2818880a))
* set hsot to display block ([cbaf706](https://github.com/n6ai/minze/commit/cbaf7061f666d169c5e1887d908dc5d3cae0243e))
* use box-sizing border-box for host element ([e63771e](https://github.com/n6ai/minze/commit/e63771e4ba5af040d29462513db0d2bdbaaee49f))
* use static property for observedAttributes ([8ee1786](https://github.com/n6ai/minze/commit/8ee1786026edb009f648efef6187147a2e993a75))


### Bug Fixes

* add export for html add css utils ([7b3911a](https://github.com/n6ai/minze/commit/7b3911a64bbee723a252d262b6d51cfeeca76198))
* add null type to attribute change hook args ([3ee9ed4](https://github.com/n6ai/minze/commit/3ee9ed4758eda250e98b8addee658c615efc862f))
* add template strings type to html and css ([7989489](https://github.com/n6ai/minze/commit/7989489cbe6fbf98d5c529e2f03732ef5209c51b))
* allow any types for watch callback fn params ([6522420](https://github.com/n6ai/minze/commit/65224209ac505d1af73675b2c4361b0bbfc3bcb2))
* allow unlimited args in html and css utils ([6f298bc](https://github.com/n6ai/minze/commit/6f298bc62e768267bfe5b0159ed7aaa7a3c4963d))
* apply box-sizing to entire shadow dom ([46867c2](https://github.com/n6ai/minze/commit/46867c2ae731ecbe9b5d4756ffcaf62122299e34))
* cache template early to prevent rerenders ([e698a8b](https://github.com/n6ai/minze/commit/e698a8b985de84ed290527a7214a78564922f7fc))
* convert specific attrs back to their type ([1188a7e](https://github.com/n6ai/minze/commit/1188a7ed7f17276842105cdb5d68c5a5db5eff3b))
* create shorthand properties with null values ([055028b](https://github.com/n6ai/minze/commit/055028bbe1226a30e05411412712c0db73416040))
* define reactive attr props with null values ([0a85b14](https://github.com/n6ai/minze/commit/0a85b14ded61c06a06e6323dd40ca25b1089def7))
* **deps:** update all non-major dependencies ([#10](https://github.com/n6ai/minze/issues/10)) ([168bf78](https://github.com/n6ai/minze/commit/168bf784e38199ce7419cd954fda20f01c88caac))
* don't show undefined in template ([bfe893b](https://github.com/n6ai/minze/commit/bfe893b84ab3cd45542306f0025c20586eb63c30))
* json stringify only objects when exposing ([adace91](https://github.com/n6ai/minze/commit/adace911f3d578f9b22d60734d8f1b165bded38a))
* make watcher callback params optional ([3915263](https://github.com/n6ai/minze/commit/39152638b6a737a6258439f61200ea016ad91629))
* property should be static ([c428f15](https://github.com/n6ai/minze/commit/c428f159ea7dfa717506c6cc66d8c360ec1ff7cf))
* remove TemplateStringsArray return type ([7bd82f9](https://github.com/n6ai/minze/commit/7bd82f9a4e28260ba548fda4cb130b334e4e94b0))
* replace old element if it's not the same type ([a8982b9](https://github.com/n6ai/minze/commit/a8982b90652a9b5eda95591376a8b85ee7321744))
* set attributes for zero values ([9d4b1d7](https://github.com/n6ai/minze/commit/9d4b1d72b305aebdc6dd35b86127b8207ae535bf))
* set proxy object properly on parent target ([49e0908](https://github.com/n6ai/minze/commit/49e09084076e24a41220dc562f46aa23cb92e01e))
* update exposed props on deep nested changes ([0ac39ef](https://github.com/n6ai/minze/commit/0ac39ef44c76de1dd6bd7bdbeee093d3f8716c8a))


### Performance Improvements

* use async functions to remove events ([47af022](https://github.com/n6ai/minze/commit/47af02264ce61432f61122c40eea0931a41382a7))

## [1.0.3](https://github.com/n6ai/minze/compare/v1.0.2...v1.0.3) (2022-02-02)

## [1.0.2](https://github.com/n6ai/minze/compare/v1.0.1...v1.0.2) (2022-01-23)


### Bug Fixes

* add null type to attribute change hook args ([3ee9ed4](https://github.com/n6ai/minze/commit/3ee9ed4758eda250e98b8addee658c615efc862f))

## [1.0.1](https://github.com/n6ai/minze/compare/v1.0.0...v1.0.1) (2022-01-22)


### Bug Fixes

* remove TemplateStringsArray return type ([7bd82f9](https://github.com/n6ai/minze/commit/7bd82f9a4e28260ba548fda4cb130b334e4e94b0))
