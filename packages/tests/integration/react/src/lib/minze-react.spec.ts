import { test, expect } from '@playwright/test'
import { start } from '@react/utils.js'

test('Integration: React', async ({ page }) => {
  await start(page)

  expect(await page.locator('minze-react div').innerText()).toBe('Hello Minze!')
})
