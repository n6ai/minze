# Quick Start

## Try Minze online

Quickly check out what's Minze all about. You can try Minze in a Sandbox on [CodePen](https://codepen.io/sergejcodes/pen/WNZVjPo) or on StackBlitz by selecting one of the links below.

| JavaScript                                                                                                                        | TypeScript                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [vite](https://stackblitz.com/github/n6ai/minze/tree/main/packages/create-minze/template-vite?title=Minze&terminal=dev)           | [vite-ts](https://stackblitz.com/github/n6ai/minze/tree/main/packages/create-minze/template-vite-ts?title=Minze&terminal=dev)           |
| [storybook](https://stackblitz.com/github/n6ai/minze/tree/main/packages/create-minze/template-storybook?title=Minze&terminal=dev) | [storybook-ts](https://stackblitz.com/github/n6ai/minze/tree/main/packages/create-minze/template-storybook-ts?title=Minze&terminal=dev) |

## Scaffolding a project

The easiest way to get started locally is to scaffold a new Minze dev environment. It comes with everything you need to develop custom web components and publish them to npm.

> Minze requires [Node.js](https://nodejs.dev/) version >= `16.0.0`

Follow these steps in your command line to get started.

::: code-group

```bash [npm]
$ npm create minze@latest my-project -- --template vite
$ cd my-project
$ npm install
```

```bash [yarn]
$ yarn create minze my-project --template vite
$ cd my-project
$ yarn install
```

```bash [pnpm]
$ pnpm create minze my-project -- --template vite
$ cd my-project
$ pnpm install
```

```bash [bun]
$ bun create minze my-project --template vite
$ cd my-project
$ bun install
```

:::

## Creating a component

1. In the root directory of your project start the development server and open the [`http://localhost:5173`](http://localhost:5173) URL.

::: code-group

```bash [npm]
$ npm run dev
```

```bash [yarn]
$ yarn dev
```

```bash [pnpm]
$ pnpm run dev
```

```bash [bun]
$ bun run dev
```

:::

2. Navigate to the `src/lib` directory and create a new `new-element.js` file. The `lib` directory is where all of your web components live. During development all of them are auto-registered and ready to use.

::: tip

You can also use sub-directories inside the lib directory e.g. `lib/sub-dir/new-element.js`

:::

```
src/
└─ lib/
   ├─ ...
   └─ new-element.js // [!code ++]
```

3. Paste the following code into the file. The component will be auto-registered with dash-case naming `new-element` inferred from the class name `NewElement`.

::: warning
Keep in mind to name your component classes in `PascalCase`, otherwise the auto-inferrence from class to `dash-case` element name will not work.
:::

::: code-group

```js [src/lib/new-element.js]
import { MinzeElement } from 'minze'

export class NewElement extends MinzeElement {
  // html template
  html = () => `<div>My very own component!</div>`

  // scoped stylesheet
  css = () => `
    div {
      background: rgb(55 245 220);
      color: rgb(50 50 50);
      padding: 1rem;
    }
  `
}
```

:::

4. Create a `preview.dev.html` file in the `src` directory (by default, git won't track this file). The file is injected into the preview during dev runtime and is what you see on the screen when you are running the dev task, if no `preview.dev.html` file is present, it falls back to `preview.html` (which is tracked by git).

```
src/
├─ ...
├─ preview.dev.html // [!code ++]
└─ preview.html
```

5. Add your element to `preview.dev.html`. This file is essentially a little sandbox for trying out and previewing your components.

::: code-group

```html [src/preview.dev.html]
<new-element></new-element> // [!code ++]
```

:::

6. Profit. Your component/element should be displayed in the browser.

::: tip Next steps:

- Add [HTML/CSS Syntax Highlighting](/guide/advanced/syntax-highlighting) with VS Code Plugin.
- Learn how to [publish and use](/guide/publishing) your components.
- Learn how to use Minze with [TypeScript](/guide/advanced/typescript).

:::
