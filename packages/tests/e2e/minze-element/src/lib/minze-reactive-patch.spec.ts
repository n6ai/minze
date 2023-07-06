import { test, expect } from '@playwright/test'
import { start } from '@tests/minze-element/utils'

const element = 'minze-reactive-patch'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  await page.fill(`${element} input`, '99')
  await expect(page.locator(element)).toBeFocused()

  await page.click(`${element} button`)
  await expect(page.locator(element)).not.toBeFocused()
})
