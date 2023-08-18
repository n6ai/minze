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

4. Add a `playwright.config.js` file to the root directory of your project.

::: code-group

```js [playwright.config.js]
import { defineConfig } from '@playwright/test'

export default defineConfig({
  webServer: {
    command: 'vite',
    port: 5173,
    reuseExistingServer: true
  }
})
```

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

test('my-button', async ({ page }) => {
  await page.goto('/')
  await page.setContent('<my-button></my-button>')

  await expect(page.locator('my-button')).toHaveCount(1) // check if element exists
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

:::

::: tip
For more details about Playwright refer to the [Playwright docs](https://playwright.dev/).
:::
