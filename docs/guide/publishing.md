# Publishing

## npm

If you set up an environment via the `create-minze` CLI, you can publish your components to npm in two simple steps.

**1. Build**

> This command creates a dist directory with an `es` build, a `CDN` build and Type Declarations (If you selected the TypeScript template).

::: code-group

```bash [npm]
$ npm run build
```

```bash [yarn]
$ yarn build
```

```bash [pnpm]
$ pnpm run build
```

:::

**2. Publish**

```bash
$ npm publish
```

::: tip
This is a default npm command refer to the npm [docs](https://docs.npmjs.com/cli/v8/commands/npm-publish) for more information.
:::

## Using

To use your package in a project simply install your package and then import and define the elements. `Minze` is embedded directly into the published package.

> Let's assume you published your library under the name `my-awesome-package`

### npm

::: code-group

```bash [npm]
$ npm install my-awesome-package
```

```bash [yarn]
$ yarn add my-awesome-package
```

```bash [pnpm]
$ pnpm add my-awesome-package
```

:::

<!-- prettier-ignore-start -->

::: code-group

```js [Define]
import { MyAwesomeElement } from 'my-awesome-package/dist/lib/my-awesome-element'
import { MyAwesomeElementTwo } from 'my-awesome-package/dist/lib/my-awesome-element-two'

MyAwesomeElement.define()
MyAwesomeElementTwo.define()
```

```js [Define All]
import { modules, defineAll } from 'my-awesome-package'
defineAll(modules)
```

:::

```html
<my-awesome-element></my-awesome-element>
<my-awesome-element-two></my-awesome-element-two>
```

<!-- prettier-ignore-end -->

### CDN

If you have published your package to npm, you can also load it via a CDN link from `unpkg` or `jsdelivr`. Pick one of the following:

::: tip
`Module` refers here to the `ES Module` build of your package and `CDN` refers to the `UMD` build.
:::

::: details unpkg

**Module**

- `//unpkg.com/my-awesome-package@latest/dist/module.js` for latest version
- `//unpkg.com/my-awesome-package@1.0.0/dist/module.js` pin to specific version

**CDN**

- `//unpkg.com/my-awesome-package@latest` for latest version
- `//unpkg.com/my-awesome-package@1.0.0` pin to specific version

:::

::: details jsdelivr

**Module**

- `//cdn.jsdelivr.net/npm/my-awesome-package@latest/dist/module.js` for latest version
- `//cdn.jsdelivr.net/npm/my-awesome-package@1.0.0/dist/module.js` pin to specific version

**CDN**

- `//cdn.jsdelivr.net/npm/my-awesome-package@latest` for latest version
- `//cdn.jsdelivr.net/npm/my-awesome-package@1.0.0` pin to specific version

:::

**Example**

<!-- prettier-ignore-start -->

::: code-group

```html [CDN]
<html>
  <head></head>
  <body>
    <!-- custom components -->
    <my-awesome-element></my-awesome-element>
    <my-awesome-element-two></my-awesome-element-two>

    <!-- cdn link -->
    <script src="//unpkg.com/my-awesome-package@latest" defer></script>
  </body>
</html>
```

```html [Module]
<html>
  <head></head>
  <body>
    <!-- custom components -->
    <my-awesome-element></my-awesome-element>
    <my-awesome-element-two></my-awesome-element-two>

    <!-- import and custom component definition -->
    <script type="module">
      const url = '//unpkg.com/my-awesome-package@latest/dist/module.js'
      const { modules, defineAll } = await import(url)
      defineAll(modules)
    </script>
  </body>
</html>
```

```html [Module > lib]
<html>
  <head></head>
  <body>
    <!-- custom components -->
    <my-awesome-element></my-awesome-element>
    <my-awesome-element-two></my-awesome-element-two>

    <!-- import and custom component definition -->
    <script type="module">
      const { MyAwesomeElement } = await import('//unpkg.com/my-awesome-package@latest/dist/lib/my-awesome-element.js')
      const { MyAwesomeElementTwo } = await import('//unpkg.com/my-awesome-package@latest/dist/lib/my-awesome-element-two.js')

      MyAwesomeElement.define()
      MyAwesomeElementTwo.define()
    </script>
  </body>
</html>
```

:::

<!-- prettier-ignore-end -->
