# Publishing

## npm

If you set up an environment via the `create-minze` CLI, you can publish your components to npm in two simple steps.

**1. Build**

> This command creates a dist directory with an `es` build, a `CDN` build and Type Declarations (If you selected the TypeScript template).

```bash
# npm
$ npm run build

# yarn
$ yarn build

# pnpm
$ pnpm run build
```

**2. Publish**

```bash
$ npm publish
```

::: tip
This is a default npm command refer to the npm [docs](https://docs.npmjs.com/cli/v8/commands/npm-publish) for more information.
:::

## Using

To use your package in a project simply install `minze` plus your package.

> Let's assume you published your library under the name `my-awesome-package`

### npm

```bash
$ npm install minze my-awesome-package
```

```js
import Minze from 'minze'
import { MyAwesomeElement, MyAwesomeElementTwo } from 'my-awesome-package'

Minze.defineAll([MyAwesomeElement, MyAwesomeElementTwo])
```

```html
<my-awesome-element></my-awesome-element>
<my-awesome-element-two></my-awesome-element-two>
```

### CDN

If you have published your package to npm, you can also load it via a CDN link from `unpkg` or `jsdelivr`. Pick one of the following:

**unpkg**

- `//unpkg.com/my-awesome-package@latest` for latest version
- `//unpkg.com/my-awesome-package@1.0.0` pin to specific version

**jsdelivr**

- `//cdn.jsdelivr.net/npm/my-awesome-package@latest` for latest version
- `//cdn.jsdelivr.net/npm/my-awesome-package@1.0.0` pin to specific version

**Example**

```html
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
