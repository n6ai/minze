# UnoCSS

[UnoCSS](https://unocss.dev) is an Instant On-demand Atomic CSS Engine, similar to Tailwind CSS.

If you used the [CLI method](/guide/installation#cli) to install Minze you can extend your environment with UnoCSS quite quickly by adding `unocss` npm package.

> The following guide is based on a fresh Minze CLI installation.

1. Install dependencies.

::: code-group

```bash [npm]
$ npm add -D unocss @unocss/postcss
```

```bash [yarn]
$ yarn add -D unocss @unocss/postcss
```

```bash [pnpm]
$ pnpm add -D unocss @unocss/postcss
```

:::

2. Setup files. This will allow you to use UnoCSS in the entire project (components, css files, as well as preview templates).

- Create and populate `uno.css`, `postcss.config.cjs` and `uno.config.js` files.
- Import the `uno.css` file into `vite.js`.
- Add UnoCSS Vite plugin, with the shadow-dom mode enabled, to your `vite.config.js` file.

::: code-group

```txt [files]
├─ src/
|  └─ assets/
|  |  ├─ uno.css // [!code ++]
|  |  └─ vite.css
|  ├─ ...
|  └─ vite.js // [!code warning]
├─ ...
├─ postcss.config.cjs // [!code ++]
├─ uno.config.js // [!code ++]
└─ vite.config.js // [!code warning]
```

```css [uno.css]
@unocss all;
```

```js [postcss.config.cjs]
module.exports = {
  plugins: {
    '@unocss/postcss': {}
  }
}
```

```js [uno.config.js]
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  theme: {},
  presets: [presetUno({ dark: 'media' })]
})
```

```js [vite.js]
import './assets/uno.css' // [!code ++]
import './assets/vite.css'
// ...
```

```js [vite.config.js]
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import UnoCSS from 'unocss/vite' // [!code ++]
import minze from 'vite-plugin-minze'

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  plugins: [
    UnoCSS({ mode: 'shadow-dom' }), // [!code ++]
    minze()
  ]
})
```

:::

3. Create `my-button.css` file and populate it's contents.

::: code-group

```txt [files]
src/
└─ lib/
   ├─ ...
   ├─ my-button.css // [!code ++]
   └─ my-button.js
```

```css [my-button.css]
button {
  @apply w-full sm:w-auto text-base font-bold rounded transition duration-100 px-4 py-3;

  color: var(--button-color, theme('colors.white'));
  background: var(--button-bg, theme('colors.sky.400'));

  &:hover {
    background: var(--button-bg-hover, theme('colors.sky.500'));
  }
}
```

:::

4. Import the CSS file as `?inline` and replace the css block with `@unocss-placeholder ${css}`. This block will be augmented with compiled CSS during processing.

::: code-group

```js [src/lib/my-button.js]
import { MinzeElement } from 'minze'
import css from './my-button.css?inline'

export class MyButton extends MinzeElement {
  html = () => `
    <button class="border-2 border-sky-500"> // [!code ++]
      <slot></slot>
    </button>
  `

  css = () => `@unocss-placeholder ${css};` // [!code ++]
}
```

:::

::: tip
For more details about UnoCSS and web components refer to the [UnoCSS documentation](https://unocss.dev/integrations/vite#web-components).
:::
