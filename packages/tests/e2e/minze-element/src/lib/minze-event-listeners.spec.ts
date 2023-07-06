import { test, expect } from '@playwright/test'
import { start } from '@tests/minze-element/utils'

const element = 'minze-event-listeners'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selector = `${element} button`

  expect(await page.locator(selector).innerText()).toBe('')

  await page.click(selector)

  expect(await page.locator(selector).innerText()).toBe('clicked')
})
