# Quick Start

## Try Minze online

Quickly check out what's Minze all about.

| Site       |                                                                                                                             |                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| StackBlitz | [JavaScript](https://stackblitz.com/github/n6ai/minze/tree/main/packages/create-minze/template-js?title=Minze&terminal=dev) | [TypeScript](https://stackblitz.com/github/n6ai/minze/tree/main/packages/create-minze/template-ts?title=Minze&terminal=dev) |
| CodePen    | [JavaScript](https://codepen.io/sergejcodes/pen/WNZVjPo)                                                                    |                                                                                                                             |

## Scaffolding a project

The easiest way to get started locally is to scaffold a new Minze dev and publishing environment. It comes with everything you need to develop custom web components and publish them to npm. Out of the box, it comes with [vite](https://vitejs.dev/).

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

2. Navigate to the `lib` directory and create a new file.

```
src/
└─ lib/
   ├─ ...
   └─ my-element.js
```

3. Paste the following code into the file. The component will be auto-registered with dash-case naming `my-element` inferred from the class name `MyElement`.

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  // html template
  html = () => `<div>My very own component!</div>`

  // scoped stylesheet
  css = () => `
    div {
      background: rgb(55 245 220);
      padding: 1rem;
    }
  `
}
```

4. Open the `template.js` file.

```
src/
├─ ...
└─ template.js
```

5. Add your component to the template inside `template.js`.

```js
export default `
  <my-element></my-element>
  <minze-counter></minze-counter>
`
```

6. Profit. Your component should be displayed in the browser.

::: tip Next steps:

- Learn how to [publish and use](/guide/publishing) your components.
- Learn how to use Minze with [TypeScript](/guide/advanced-typescript).

:::
