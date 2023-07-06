import { test, expect } from '@playwright/test'
import { start } from '@minze-element/utils.js'

const element = 'minze-define'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selector = `${element} div`

  expect(await page.locator(selector).innerText()).toBe('Hello Minze!')
})
