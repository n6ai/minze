# Installation

Minze can be installed in several different ways.

## npm

Installing from npm:

::: code-group

```bash [npm]
$ npm install minze
```

```bash [yarn]
$ yarn add minze
```

```bash [pnpm]
$ pnpm add minze
```

:::

::: tip
You can also import the main `Minze` class as a default import: <br> `import Minze, { MinzeElement } from 'minze'`
:::

```js
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `Hello Minze!`
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

## CLI

Installing via command line:

::: tip
The CLI method scaffolds a Minze dev and publishing environment running `vite`.
:::

> Minze requires [Node.js](https://nodejs.dev/) version >= `16.0.0`

**npm**

::: code-group

```bash [npm]
$ npm init minze@latest
```

```bash [yarn]
$ yarn create minze
```

```bash [pnpm]
$ pnpm create minze
```

:::

Then follow the prompts!

### Templates

There are currently the following templates available:

- JavaScript - `js`
- TypeScript - `ts`

> The shorthand can be used in command line options, e.g. `--template ts`

### Command line options

You can directly specify the project name and template via additional command line options. For example, to scaffold a TypeScript environment, run:

::: code-group

```bash [npm]
$ npm init minze@latest my-project -- --template ts
```

```bash [yarn]
$ yarn create minze my-project --template ts
```

```bash [pnpm]
$ pnpm create minze my-project -- --template ts
```

:::

## CDN

Loading Minze via a CDN link from `unpkg` or `jsdelivr`. Pick one of the following:

::: tip
`Module` refers here to the `ES Module` build of Minze and `CDN` refers to the `UMD` build.
:::

::: details unpkg

**Module**

- `//unpkg.com/minze@latest/dist/module.js` for latest version
- `//unpkg.com/minze@1.0.0/dist/module.js` pin to specific version

**CDN**

- `//unpkg.com/minze@latest` for latest version
- `//unpkg.com/minze@1.0.0` pin to specific version

:::

::: details jsdelivr

**Module**

- `//cdn.jsdelivr.net/npm/minze@latest/dist/module.js` for latest version
- `//cdn.jsdelivr.net/npm/minze@1.0.0/dist/module.js` pin to specific version

**CDN**

- `//cdn.jsdelivr.net/npm/minze@latest` for latest version
- `//cdn.jsdelivr.net/npm/minze@1.0.0` pin to specific version

:::

**Example**

<!-- prettier-ignore-start -->

::: code-group

```html [CDN]
<html>
  <head></head>
  <body>
    <!-- custom component -->
    <my-element></my-element>

    <!-- minze -->
    <script src="//unpkg.com/minze@latest" defer></script>

    <!-- custom component definition -->
    <script type="module">
      (class MyElement extends MinzeElement {
        html = () => `Hello Minze!`
      }.define())
    </script>
  </body>
</html>
```

```html [Module]
<html>
  <head></head>
  <body>
    <!-- custom component -->
    <my-element></my-element>

    <!-- import and custom component definition -->
    <script type="module">
      import { MinzeElement } from '//unpkg.com/minze@latest/dist/module.js'

      (class MyElement extends MinzeElement {
        html = () => `Hello Minze!`
      }.define())
    </script>
  </body>
</html>
```

```html [Module > defineAll]
<html>
  <head></head>
  <body>
    <!-- custom components -->
    <my-element></my-element>
    <my-element-two></my-element-two>

    <!-- import and custom component definition -->
    <script type="module">
      import { Minze, MinzeElement } from '//unpkg.com/minze@latest/dist/module.js'

      class MyElement extends MinzeElement {
        html = () => `Hello Minze!`
      }

      class MyElementTwo extends MinzeElement {
        html = () => `Hello Minze again!`
      }

      Minze.defineAll([MyElement, MyElementTwo])
    </script>
  </body>
</html>
```

:::

<!-- prettier-ignore-end -->
