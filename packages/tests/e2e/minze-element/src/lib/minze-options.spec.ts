import { test, expect } from '@playwright/test'
import { start } from '@tests/minze-element/utils'

const element = 'minze-options'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  expect(await page.getAttribute(element, 'rendered')).toBe('')
})
