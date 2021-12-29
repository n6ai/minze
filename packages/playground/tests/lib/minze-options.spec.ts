import { test, expect } from '@playwright/test'

test('minze-options', async ({ page }) => {
  await page.goto('')

  const element = 'minze-options'
  expect(await page.getAttribute(element, 'rendered')).toBe('')
})
