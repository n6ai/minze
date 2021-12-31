import { test, expect } from '@playwright/test'
import { start } from 'playground/tests/utils'

const element = 'minze-options'

test(element, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  expect(await page.getAttribute(element, 'rendered')).toBe('')
})
