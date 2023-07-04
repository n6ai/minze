# Publishing

## npm

If you set up an environment via the `create-minze` CLI, you can publish your components to npm in two simple steps.

**1. Build**

> This command creates a `dist/` directory with an `es` build and Type Declarations (If you selected the TypeScript template).

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

> Let's assume you published your library under the name `my-package`

### npm

::: code-group

```bash [npm]
$ npm install my-package
```

```bash [yarn]
$ yarn add my-package
```

```bash [pnpm]
$ pnpm add my-package
```

:::

<!-- prettier-ignore-start -->

::: code-group

```js [Define All]
import { modules, defineAll } from 'my-package'
defineAll(modules)
```

```js [Define Separate]
import { MyElement } from 'my-package/dist/lib/my-element'
import { MyElementTwo } from 'my-package/dist/lib/my-element-two'

MyElement.define()
MyElementTwo.define()
```

:::

```html
<my-element></my-element>
<my-element-two></my-element-two>
```

<!-- prettier-ignore-end -->

### CDN

If you have published your package to npm, you can also load it via a CDN link from `unpkg`, `jsdelivr` or `esm.sh`. Pick one of the following:

::: details unpkg

- `https://unpkg.com/my-package` for latest version
- `https://unpkg.com/my-package@1.0.0` pin to specific version

:::

::: details jsdelivr

- `https://cdn.jsdelivr.net/npm/my-package` for latest version
- `https://cdn.jsdelivr.net/npm/my-package@1.0.0` pin to specific version

:::

::: details esm.sh

- `https://esm.sh/my-package` for latest version
- `https://esm.sh/my-package@1.0.0` pin to specific version

:::

**Example**

<!-- prettier-ignore-start -->

::: code-group

```html [Define All]
<html>
  <head></head>
  <body>
     <!-- custom elements -->
    <my-element></my-element>
    <my-element-two></my-element-two>

    <!-- js code -->
    <script type="module">
      import { modules, defineAll } from 'https://unpkg.com/my-package'
      defineAll(modules)
    </script>
  </body>
</html>
```

```html [Define Separate]
<html>
  <head></head>
  <body>
     <!-- custom elements -->
    <my-element></my-element>
    <my-element-two></my-element-two>

    <!-- js code -->
    <script type="module">
      const root = 'https://unpkg.com/my-package/dist'

      const { defineAll } = await import(`${root}/module.js`)
      const { MyElement } = await import(`${root}/lib/my-element.js`)
      const { MyElementTwo } = await import(`${root}/lib/my-element-two.js`)

      defineAll([MyElement, MyElementTwo])
    </script>
  </body>
</html>
```

:::

<!-- prettier-ignore-end -->
