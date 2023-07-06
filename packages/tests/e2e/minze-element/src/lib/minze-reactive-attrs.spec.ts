import { test, expect } from '@playwright/test'
import { start } from '@minze-element/utils.js'

const element = 'minze-reactive-attrs'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  expect(await page.locator(`${element} .count`).innerText()).toBe('0')
  expect(await page.getAttribute(element, 'count')).toBe('0')

  expect(await page.locator(`${element} .shorthand`).innerText()).toBe('object') // null object
  expect(await page.getAttribute(element, 'shorthand')).toBeFalsy()

  expect(await page.locator(`${element} .empty`).innerText()).toBe('object') // null object
  expect(await page.getAttribute(element, 'empty')).toBeFalsy()

  expect(await page.locator(`${element} .undefined`).innerText()).toBe(
    'undefined'
  )
  expect(await page.getAttribute(element, 'undefined')).toBe('undefined')

  expect(await page.locator(`${element} .null`).innerText()).toBe('object') // null object
  expect(await page.getAttribute(element, 'null')).toBe('null')

  expect(await page.locator(`${element} .boolean`).innerText()).toBe('boolean')
  expect(await page.getAttribute(element, 'boolean')).toBe('false')

  expect(await page.locator(`${element} .object`).innerText()).toBe('string')
  expect(await page.getAttribute(element, 'object')).toBe('{}')

  await page.locator(element).evaluate((node) => {
    node.setAttribute('count', '1')
  })

  expect(await page.locator(`${element} .count`).innerText()).toBe('1')
  expect(await page.getAttribute(element, 'count')).toBe('1')
})
