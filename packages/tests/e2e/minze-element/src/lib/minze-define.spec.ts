import { test, expect } from '@playwright/test'
import { start } from '@tests/minze-element/utils'

const element = 'minze-define'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selector = `${element} div`

  expect(await page.locator(selector).innerText()).toBe('Hello Minze!')
})
