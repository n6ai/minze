import { test, expect } from '@playwright/test'
import { start } from '@minze-element/utils.js'

const element = 'minze-options'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  expect(await page.getAttribute(element, 'rendered')).toBe('')
})
