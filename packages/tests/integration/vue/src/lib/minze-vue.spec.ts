import { test, expect } from '@playwright/test'
import { start } from '@vue/utils.js'

test('Integration: Vue', async ({ page }) => {
  await start(page)

  expect(await page.locator('minze-vue div').innerText()).toBe('Hello Minze!')
})
