import { test, expect } from '@playwright/test'
import { start } from '@tests/minze-element/utils'

const element = 'minze-exportparts'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selector = `${element} button`

  await expect(page.locator(element)).toHaveAttribute(
    'exportparts',
    'button, button--primary'
  )

  await page.click(selector)

  await expect(page.locator(element)).toHaveAttribute(
    'exportparts',
    'button, button--primary, another-part'
  )
})
