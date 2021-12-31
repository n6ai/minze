import { test, expect } from '@playwright/test'
import { start } from 'playground/tests/utils'

const element = 'minze-reactive'

test(element, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selector = `${element} button`

  expect(await page.locator(selector).innerText()).toBe('0')
  expect(await page.getAttribute(element, 'count')).toBe('0')

  await page.click(selector)

  expect(await page.locator(selector).innerText()).toBe('1')
  expect(await page.getAttribute(element, 'count')).toBe('1')
})
