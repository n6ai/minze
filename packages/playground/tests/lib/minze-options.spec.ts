import { test, expect } from '@playwright/test'
import { start } from 'playground/tests/utils'

const element = 'minze-options'

test(element, async ({ page }) => {
  await start(page, element)
  expect(await page.getAttribute(element, 'rendered')).toBe('')
})
