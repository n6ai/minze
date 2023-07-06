import { test, expect } from '@playwright/test'
import { start } from '@tests/react/utils'

test('Integration: React', async ({ page }) => {
  await start(page)

  expect(await page.locator('minze-react div').innerText()).toBe('Hello Minze!')
})
