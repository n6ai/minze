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

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `Hello Minze!`
}

MyElement.define()
```

```html
<my-element></my-element>
```

## CLI

Installing via command line:

> Minze requires [Node.js](https://nodejs.dev/) version >= `16.0.0`

**npm**

::: code-group

```bash [npm]
$ npm create minze@latest
```

```bash [yarn]
$ yarn create minze
```

```bash [pnpm]
$ pnpm create minze
```

:::

Then follow the prompts!

### Command line options

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite environment, run:

::: code-group

```bash [npm]
$ npm create minze@latest my-project -- --template vite
```

```bash [yarn]
$ yarn create minze my-project --template vite
```

```bash [pnpm]
$ pnpm create minze my-project -- --template vite
```

:::

Currently supported template presets include:

- `vite`
- `vite-ts`
- `storybook`
- `storybook-ts`

You can use `.` for the project name to scaffold in the current directory.

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
