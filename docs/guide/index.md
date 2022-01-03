# Quick Start

The easiest way to get started is to scaffold a new Minze Dev and Publishing environment. It comes with everything you need to develop custom web components and publish them to npm. Out of the box, it comes with [rollup](https://rollupjs.org/) and [vite](https://vitejs.dev/).

## Scaffolding a project

Follow these steps in your command line to get started.

**npm**

```bash
$ npm init minze@latest my-project -- --template js
$ cd my-project
$ npm install
```

**yarn**

```bash
$ yarn create minze my-project --template js
$ cd my-project
$ yarn install
```

**pnpm**

```bash
$ pnpm create minze my-minze-env -- --template js
$ cd my-project
$ yarn install
```

## Creating a component

1. In the root directory of your project start the development server and open the [`http://localhost/3000`](http://localhost/3000) URL.

```bash
# npm
$ npm run dev

# yarn
$ yarn dev

# pnpm
$ pnpm run dev
```

2. Navigate to the `lib` directory and create a new file.

```
src/
└─ lib/
   ├─ ...
   └─ my-element.js
```

3. Paste the following code into the file.

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

4. Open the `module.js` and `template.js` files.

```
src/
├─ ...
├─ module.js
└─ template.js
```

5. Define an export for your component at the bottom of `module.js`.

```js
// ...
export * from './lib/my-element'
```

5. Add your component to the template inside `template.js`.

```js
export default `
  <div class="minze-wrap">
    <!-- ... -->
    <my-element></my-element>
  </div>
`
```

6. Profit. Your component should be displayed in the browser.

::: tip
Next steps:

- Learn how to [publish and use](/guide/publishing) your components.
- Learn how to use Minze with [TypeScript](/guide/advanced-typescript).

:::
