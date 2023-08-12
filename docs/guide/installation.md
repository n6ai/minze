# Installation

Minze can be installed in several different ways.

## npm

Installing from npm:

::: code-group

```bash [npm]
$ npm add minze
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

Loading Minze via a CDN link from [`esm.sh`](https://esm.sh), [`unpkg`](https://unpkg.com) or [`jsdelivr`](https://www.jsdelivr.com). Pick one of the following:

::: details esm.sh

- `https://esm.sh/minze` for latest version
- `https://esm.sh/minze@1.0.0` pin to specific version

:::

::: details unpkg

- `https://unpkg.com/minze` for latest version
- `https://unpkg.com/minze@1.0.0` pin to specific version

:::

::: details jsdelivr

- `https://esm.run/minze` for latest version
- `https://esm.run/minze@1.0.0` pin to specific version

:::

::: warning
In production, always pin your imports to a specific version to prevent your application from breaking unexpectedly during a future update.
:::

<!-- prettier-ignore-start -->

::: code-group

```html [Module]
<html>
  <head></head>
  <body>
    <!-- custom element -->
    <my-element></my-element>

    <!-- js code -->
    <script type="module">
      import { MinzeElement } from 'https://esm.sh/minze'

      ;(class MyElement extends MinzeElement {
        html = () => `Hello Minze!`
      }).define()
    </script>
  </body>
</html>
```

```html [Module > defineAll]
<html>
  <head></head>
  <body>
    <!-- custom elements -->
    <first-element></first-element>
    <second-element></second-element>

    <!-- js code -->
    <script type="module">
      import { Minze, MinzeElement } from 'https://esm.sh/minze'

      class FirstElement extends MinzeElement {
        html = () => `Hello Minze!`
      }

      class SecondElement extends MinzeElement {
        html = () => `Hello Minze again!`
      }

      Minze.defineAll([FirstElement, SecondElement])
    </script>
  </body>
</html>
```

:::

<!-- prettier-ignore-end -->
