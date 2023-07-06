import { test, expect } from '@playwright/test'
import { start } from '@svelte/utils.js'

test('Integration: Svelte', async ({ page }) => {
  await start(page)

  expect(await page.locator('minze-svelte div').innerText()).toBe(
    'Hello Minze!'
  )
})
