# Testing

If you used the [CLI method](/guide/installation#cli) to install Minze you can extend your environment with component tests quite quickly by using [Playwright](https://playwright.dev/).

> The following guide is based on a fresh Minze CLI installation.

1. Install `@playwright/test` and `cross-env`.

```bash
$ npm install -D @playwright/test cross-env
```

2. Add test scripts to `package.json`.

```json
// package.json
{
  "scripts": {
    // ...
    "test": "npx playwright test",
    "test-debug": "cross-env PWDEBUG=1 npm test"
  }
}
```

3. Add a `playwright.config.js` file to the root directory of your project.

```js
// playwright.config.js
export default {
  use: {
    baseURL: 'http://localhost:3000/tests/'
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true
  }
}
```

4. Create a new `tests/` directory with 3 new files:
   - `index.html`
   - `vite.js`
   - `minze-button.spec.js`

Your project should now look something like this:

```
minze-project/
├─ ...
├─ playwright.config.js
├─ package.json
└─ tests/
   ├─ index.html
   ├─ minze-button.spec.js
   └─ vite.js
```

5. Add the following code to your newly created `vite.js` file to register all components:

```js
import Minze from 'minze'
import * as Elements from '../src/module'

Minze.defineAll(Elements)
```

6. Add the following code to your newly created `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./vite.js"></script>
  </body>
</html>
```

7. Add the following code to your newly created `minze-button.spec.js` file:

```js
import { test, expect } from '@playwright/test'

test('minze-button', async ({ page }) => {
  await page.goto('')
  await page.locator('#app').evaluate((node) => {
    node.innerHTML = `<minze-button></minze-button>`
  })

  await expect(page.locator('minze-button')).toHaveCount(1) // check if element exists
  // ...
})
```

8. Run the test script.

```bash
$ npm test
# or
$ npm run test-debug
```

::: tip
For more details about Playwright refer to the [Playwright documentation](https://playwright.dev/).
:::
