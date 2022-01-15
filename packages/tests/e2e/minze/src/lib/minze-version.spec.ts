import { test, expect } from '@playwright/test'
import { start } from '../utils'

test('Minze: version', async ({ page }) => {
  await start(page)

  expect(await page.locator('.minze-version').innerText()).toMatch(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
  )
})
