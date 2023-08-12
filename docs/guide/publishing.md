# Publishing

## npm

If you set up an environment via the `create-minze` CLI, you can publish your components to npm in two simple steps.

**1. Build**

> This command creates a `dist/` directory with an `ESM` build and Type Declarations (If you selected the TypeScript template).

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
This is a default npm command refer to the [npm docs](https://docs.npmjs.com/cli/commands/npm-publish) for more information.
:::

## Using

To use your package in a project simply install your package and then import and define the elements. `Minze` is embedded directly into the published package.

> Let's assume you published your library under the name `my-package`

### npm

::: code-group

```bash [npm]
$ npm add my-package
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

```js [Define Individual]
import { modules, defineAll } from 'my-package'
defineAll(modules, ['my-element', 'nested/my-element-two'])
```

```txt [Source Files]
src/
└─ lib/
   ├─ nested/
   |  └─ my-element-two.js // [!code ++]
   └─ my-element.js // [!code ++]
```

:::

```html
<my-element></my-element>
<my-element-two></my-element-two>
```

<!-- prettier-ignore-end -->

::: tip
You can provide an array of shorthand file-paths as the second argument to the `defineAll` function, to define individual elements.

The paths are derived from the directory structure of the source files.

Every path starts from the `src/lib/` directory (no starting slash) and ends without the file-extension. E.g. for `src/lib/nested/some-element.js` it's `nested/some-element`.
:::

### CDN

If you have published your package to npm, you can also load it via a CDN link from [`esm.sh`](https://esm.sh), [`unpkg`](https://unpkg.com) or [`jsdelivr`](https://www.jsdelivr.com). Pick one of the following:

::: details esm.sh

- `https://esm.sh/my-package` for latest version
- `https://esm.sh/my-package@1.0.0` pin to specific version

:::

::: details unpkg

- `https://unpkg.com/my-package` for latest version
- `https://unpkg.com/my-package@1.0.0` pin to specific version

:::

::: details jsdelivr

- `https://esm.run/my-package` for latest version
- `https://esm.run/my-package@1.0.0` pin to specific version

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
      import { modules, defineAll } from 'https://esm.sh/my-package'
      defineAll(modules)
    </script>
  </body>
</html>
```

```html [Define Individual]
<html>
  <head></head>
  <body>
    <!-- custom elements -->
    <my-element></my-element>
    <my-element-two></my-element-two>

    <!-- js code -->
    <script type="module">
      import { modules, defineAll } from 'https://esm.sh/my-package'
      defineAll(modules, ['my-element', 'nested/my-element-two'])
    </script>
  </body>
</html>
```

```txt [Source Files]
src/
└─ lib/
   ├─ nested/
   |  └─ my-element-two.js // [!code ++]
   └─ my-element.js // [!code ++]
```

:::

<!-- prettier-ignore-end -->
