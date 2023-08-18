# Vite

The default Minze dev environment runs with Vite. If you want to build a components library have a look at the [CLI Installation Guide](/guide/installation#cli) or the [Vite Template](https://github.com/n6ai/minze/tree/main/packages/create-minze/template-vite) in the Minze repo.

If you want to add Minze to a fresh Vite project follow these steps:

1. Install dependencies.

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

2. Set `keepNames` to true, to keep class names as is.

::: code-group

```js [vite.config.js]
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    keepNames: true
  }
})
```

:::

3. Import `MinzeElement` and define a component.

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => 'Hello Minze!'
}

MyElement.define()
```

4. Add the component to any of your markup templates.

```html
<my-element></my-element>
```
