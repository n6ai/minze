# Playwright

If you used the [CLI method](/guide/installation#cli) to install Minze you can extend your environment with e2e tests quite quickly by using [Playwright](https://playwright.dev/).

> The following guide is based on a fresh Minze CLI installation.

1. Install dependencies.

::: code-group

```bash [npm]
$ npm add -D @playwright/test
```

```bash [yarn]
$ yarn add -D @playwright/test
```

```bash [pnpm]
$ pnpm add -D @playwright/test
```

```bash [bun]
$ bun add -D @playwright/test
```

:::

2. Initialize Playwright.

```bash [npm]
npx playwright install
```

3. Add test scripts to `package.json`.

::: code-group

```json [package.json]
{
  "scripts": {
    // ...
    "test": "npx playwright test",
    "test-ui": "npx playwright test --ui",
    "test-debug": "npx playwright test --debug"
  }
}
```

:::

4. Create and populate `playwright.config.js` and `utils.js` files. Wrap the preview code inside `vite.js` in a conditional.

::: code-group

```txt [files]
├─ src/
|  ├─ ...
|  ├─ utils.js // [!code ++]
|  └─ vite.js // [!code warning]
├─ ...
└─ playwright.config.js // [!code ++]
```

```js [playwright.config.js]
import { defineConfig } from '@playwright/test'

export default defineConfig({
  webServer: {
    command: 'vite -m testing',
    port: 5173,
    reuseExistingServer: !process.env.CI
  }
})
```

```js [src/utils.js]
export async function setup(page, html) {
  await page.goto('/')

  await page.evaluate((html) => {
    const app = document.querySelector('#app')
    if (app) app.innerHTML = html
  }, html)
}
```

<!-- prettier-ignore-start -->
```js [src/vite.js]
import './assets/vite.css'

import { modules, defineAll } from './main'
defineAll(modules)

if (import.meta.env.MODE !== 'testing') { // [!code ++]
  const previews = import.meta.glob('./*.html', { eager: true, query: '?raw', import: 'default' })
  const preview = previews['./preview.dev.html'] ?? previews['./preview.html']

  const app = document.querySelector('#app')
  if (app) app.innerHTML = preview
} // [!code ++]
```
<!-- prettier-ignore-end -->

:::

5. Create a `my-button.test.js` file inside the `src/lib` directory.

```
src/
└─ lib/
   ├─ ...
   ├─ my-button.js
   └─ my-button.test.js // [!code ++]
```

6. Add the following code to your newly created file:

::: code-group

```js [src/lib/my-button.test.js]
import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('my-button', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<my-button>Hello Minze!</my-button>')
  })

  test('html', async ({ page }) => {
    await expect(page.locator('my-button button')).toBeVisible()
  })

  // ...
})
```

:::

7. Run the test script.

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

```bash [bun]
$ bun test
```

:::

::: tip
For more details about Playwright refer to the [Playwright docs](https://playwright.dev/).
:::
