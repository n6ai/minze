# Installation

Minze can be installed in several different ways.

## npm

Installing from npm:

```bash
# npm
$ npm install minze

# yarn
$ yarn add minze

# pnpm
$ pnpm add minze
```

```js
import Minze, { MinzeElement } from 'minze'

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
The CLI method scaffolds a Minze Dev and Publishing environment including `rollup` and `vite`.
:::

> Minze requires [Node.js](https://nodejs.dev/) version >= `16.0.0`

**npm**

```bash
# npm
$ npm init minze@latest

# yarn
$ yarn create minze

# pnpm
$ pnpm create minze
```

Then follow the prompts!

### Templates

There are currently the following templates available:

- JavaScript - `js`
- TypeScript - `ts`

> The shorthand can be used in command line options, e.g. `--template ts`

### Command line options

You can directly specify the project name and template via additional command line options. For example, to scaffold a TypeScript environment, run:

```bash
# npm
$ npm init minze@latest my-project -- --template ts

# yarn
$ yarn create minze my-project --template ts

# pnpm
$ pnpm create minze my-project -- --template ts
```

## CDN

Loading Minze via a CDN link from `unpkg` or `jsdelivr`. Pick one of the following:

**unpkg**

- `//unpkg.com/minze@latest` for latest version
- `//unpkg.com/minze@1.0.0` pin to specific version

**jsdelivr**

- `//cdn.jsdelivr.net/npm/minze@latest` for latest version
- `//cdn.jsdelivr.net/npm/minze@1.0.0` pin to specific version

**Example**

```html
<html>
  <head></head>
  <body>
    <!-- custom component -->
    <my-element></my-element>

    <!-- minze -->
    <script src="//unpkg.com/minze@latest" defer></script>

    <!-- custom component definition -->
    <script type="module">
      class MyElement extends MinzeElement {
        html = () => `Hello Minze!`
      }

      Minze.defineAll([MyElement])
    </script>
  </body>
</html>
```
