import { test, expect } from '@playwright/test'
import { start } from '@tests/minze-element/utils'

const element = 'minze-event-listeners'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selectorDispatch = `${element} .dispatch`
  const selectorBroadcast = `${element} .broadcast`

  expect(await page.locator(selectorDispatch).innerText()).toBe('not-clicked')
  expect(await page.locator(selectorBroadcast).innerText()).toBe('not-clicked')

  await page.click(selectorDispatch)
  await page.click(selectorBroadcast)

  expect(await page.locator(selectorDispatch).innerText()).toBe('clicked')
  expect(await page.locator(selectorBroadcast).innerText()).toBe('clicked')
})
