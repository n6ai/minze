import { test, expect } from '@playwright/test'
import { start } from '@tests/minze-element/utils'

const element = 'minze-options'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selector = `${element} h1`

  expect(await page.getAttribute(element, 'rendered')).toBe('')
  await expect(page.locator(selector)).toHaveCSS('margin', '0px')
})
