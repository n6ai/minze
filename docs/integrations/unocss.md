# UnoCSS

[UnoCSS](https://unocss.dev) is an Instant On-demand Atomic CSS Engine, similar to Tailwind CSS.

If you used the [CLI method](/guide/installation#cli) to install Minze you can extend your environment with UnoCSS quite quickly by adding `unocss` npm package.

> The following guide is based on a fresh Minze CLI installation.

1. Install `unocss` npm package.

Installing from npm:

::: code-group

```bash [npm]
$ npm install -D unocss
```

```bash [yarn]
$ yarn add -D unocss
```

```bash [pnpm]
$ pnpm add -D unocss
```

:::

2. Add UnoCSS Vite plugin, with the shadow-dom mode enabled, to your `vite.config.js` file.

```js
// vite.config.js
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite' // [!code ++]
import minze from '@minzejs/vite-plugin-minze'

export default defineConfig({
  plugins: [
    UnoCSS({ mode: 'shadow-dom' }), // [!code ++]
    minze()
  ]
})
```

3. Add `@unocss-placeholder` to the `css` block of any of your components. This placeholder will be replaced with compiled CSS during processing.

```js
// src/lib/my-button.js
import { MinzeElement } from 'minze'

export class MyButton extends MinzeElement {
  html = () => `
    <button class="
      bg-emerald-300 // [!code ++]
      hover:bg-emerald-400 // [!code ++]
      active:bg-emerald-500 // [!code ++]
      text-black // [!code ++]
      rounded-sm // [!code ++]
      border-0 // [!code ++]
      cursor-pointer // [!code ++]
      transition // [!code ++]
      duration-100 // [!code ++]
      px-3 py-2 // [!code ++]
    ">
      <slot></slot>
    </button>
  `

  css = () => `
    @unocss-placeholder // [!code ++]
  `
}
```

::: tip
For more details about UnoCSS and web components refer to the [UnoCSS documentation](https://unocss.dev/integrations/vite#web-components).
:::
