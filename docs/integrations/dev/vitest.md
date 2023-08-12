# Vitest

If you used the [CLI method](/guide/installation#cli) to install Minze you can extend your environment with unit tests quite quickly by using [Vitest](https://vitest.dev).

> The following guide is based on a fresh Minze CLI installation.

1. Install dependencies.

::: code-group

```bash [npm]
$ npm install -D vitest @vitest/ui jsdom
```

```bash [yarn]
$ yarn add -D vitest @vitest/ui jsdom
```

```bash [pnpm]
$ pnpm add -D vitest @vitest/ui jsdom
```

:::

2. Add test scripts to `package.json`.

```json
// package.json
{
  "scripts": {
    // ...
    "test": "vitest --run",
    "test-watch": "vitest",
    "test-ui": "vitest --ui"
  }
}
```

3. Set the Vitest environment to `jsdom` inside the vite config file.

<!-- prettier-ignore-start -->

```js
// vite.config.js
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import minze from '@minzejs/vite-plugin-minze'

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  test: { // [!code ++]
    environment: 'jsdom' // [!code ++]
  }, // [!code ++]
  plugins: [minze()]
})
```

<!-- prettier-ignore-end -->

4. Create a `my-button.test.js` file inside the `src/lib` directory.

```
src/
└─ lib/
   ├─ ...
   ├─ my-button.js
   └─ my-button.test.js // [!code ++]
```

5. Add the following code to your newly created file:

```js
// my-button.test.js
import { test, expect } from 'vitest'
import { MyButton } from './my-button'

test('my-button', () => {
  expect(MyButton.name).toBe('MyButton')
  // ...
})
```

6. Run the test script.

::: code-group

```bash [npm]
$ npm test
```

```bash [yarn]
$ yarn test
```

```bash [pnpm]
$ pnpm test
```

:::

::: tip
For more details about Vitest refer to the [Vitest docs](https://vitest.dev/).
:::
