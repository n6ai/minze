# Quick Start

## Try Minze online

Quickly check out what's Minze all about.

| Site       |                                                                                                                             |                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| StackBlitz | [JavaScript](https://stackblitz.com/github/n6ai/minze/tree/main/packages/create-minze/template-js?title=Minze&terminal=dev) | [TypeScript](https://stackblitz.com/github/n6ai/minze/tree/main/packages/create-minze/template-ts?title=Minze&terminal=dev) |
| CodePen    | [JavaScript](https://codepen.io/sergejcodes/pen/WNZVjPo)                                                                    |                                                                                                                             |

## Scaffolding a project

The easiest way to get started locally is to scaffold a new Minze dev environment. It comes with everything you need to develop custom web components and publish them to npm. Out of the box, it comes with [Vite](https://vitejs.dev/).

> Minze requires [Node.js](https://nodejs.dev/) version >= `16.0.0`

Follow these steps in your command line to get started or [create a new StackBlitz project](https://stackblitz.com/github/n6ai/minze/tree/main/packages/create-minze/template-js?title=Minze&terminal=dev).

::: code-group

```bash [npm]
$ npm init minze@latest my-project -- --template js
$ cd my-project
$ npm install
```

```bash [yarn]
$ yarn create minze my-project --template js
$ cd my-project
$ yarn install
```

```bash [pnpm]
$ pnpm create minze my-project -- --template js
$ cd my-project
$ pnpm install
```

:::

## Creating a component

1. In the root directory of your project start the development server and open the `http://localhost:5173` URL.

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

:::

2. Navigate to the `src/lib` directory and create a new `my-element.js` file. The `lib` directory is where all of your web components live. During development all of them are auto-registered and ready to use.

::: tip

You can also use sub-directories inside the lib directory e.g. `lib/sub-dir/my-element.js`

:::

```
src/
└─ lib/
   ├─ ...
   └─ my-element.js // [!code ++]
```

3. Paste the following code into the file. The component will be auto-registered with dash-case naming `my-element` inferred from the class name `MyElement`.

::: warning
Keep in mind to name your component classes in `PascalCase`, otherwise the auto-inferrence from class to `dash-case` element name will not work.
:::

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
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

4. Open the `template.js` file. This file is injected into the preview during dev runtime and is what you see on the screen when you are running the dev task.

```
src/
├─ ...
└─ template.js
```

5. Add your element to the HTML template inside `template.js`. This file is essentially a little sandbox for trying out your components.

```js
export default `
  <my-element></my-element> // [!code ++]
  <minze-counter></minze-counter>
`
```

6. Profit. Your component/element should be displayed in the browser.

::: tip Next steps:

- Learn how to [publish and use](/guide/publishing) your components.
- Learn how to use Minze with [TypeScript](/guide/advanced-typescript).

:::

## Structure

The Minze dev environment runs with Vite and is already optimized for a web components development workflow.
In most cases you don't need to toch any files except for the component files in the `src/lib` directory and the `src/template.js` file.

```
src/
├─ lib/
└─ template.js
```
