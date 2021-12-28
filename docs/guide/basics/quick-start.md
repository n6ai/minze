# Quick Start

The easiest way to get started is to scaffold a new Minze dev and publishing environment. It comes with everything you need to develop custom web components and publish them to npm. Out of the box, it comes with [rollup](https://rollupjs.org/) and [vite](https://vitejs.dev/).

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

1. In the root directory of your project start the development server and open the `localhost` URL.

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

3. Paste the following code into the file:

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  // html template
  html = () => `<div>My very own component!</div>`

  // scoped stylesheet
  css = () => `
    div {
      background: red;
    }
  `
}
```

4. Open the `module.js` and `vite.js` files.

```
src/
├─ ...
├─ module.js
└─ vite.js
```

5. Replace the contents of `module.js` with:

```js
export * from './lib/my-element'
```

5. Replace the contents of `vite.js` with:

```js
import Minze from 'minze'
import { MyElement } from './module'

// define all components in a one-shot manner
Minze.defineAll([MyElement])

// get the #app element
const app = document.querySelector('#app') || null

// insert our component into the DOM
if (app) {
  app.innerHTML = `
    <my-element></my-element>
  `
}
```

6. Profit. Your component should be displayed in the browser.
