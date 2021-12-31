import { test, expect } from '@playwright/test'
import { start } from 'playground/tests/minze-element/utils'

const element = 'minze-reactive-attrs'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selector = `${element} div`

  expect(await page.locator(selector).innerText()).toBe('0')
  expect(await page.getAttribute(element, 'count')).toBe('0')

  await page.locator(element).evaluate((node) => {
    node.setAttribute('count', '1')
  })

  expect(await page.locator(selector).innerText()).toBe('1')
  expect(await page.getAttribute(element, 'count')).toBe('1')
})
