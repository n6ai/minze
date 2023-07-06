import { test, expect } from '@playwright/test'
import { start } from '@tests/minze-element/utils'

const element = 'minze-reactive-props'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selectorShorthand = `${element} .shorthand`
  const selectorStr = `${element} .str`
  const selectorArr = `${element} .arr`
  const selectorObj = `${element} .obj`

  expect(await page.locator(selectorShorthand).innerText()).toBe('null')
  expect(await page.locator(selectorStr).innerText()).toBe('initial text')
  expect(await page.locator(selectorArr).innerText()).toBe('1,2,3')
  expect(await page.locator(selectorObj).innerText()).toBe('initial value')

  expect(await page.getAttribute(element, 'shorthand')).toBeFalsy()
  expect(await page.getAttribute(element, 'str')).toBe('initial text')
  expect(await page.getAttribute(element, 'arr')).toBe('[1,2,3]')
  expect(await page.getAttribute(element, 'obj')).toBe(
    '{"nested":{"prop":"initial value"}}'
  )

  await page.click(`${element} button`)

  expect(await page.locator(selectorShorthand).innerText()).toBe('not null')
  expect(await page.locator(selectorStr).innerText()).toBe('changed text')
  expect(await page.locator(selectorArr).innerText()).toBe('1,2,3,4')
  expect(await page.locator(selectorObj).innerText()).toBe('changed value')

  expect(await page.getAttribute(element, 'shorthand')).toBeFalsy()
  expect(await page.getAttribute(element, 'str')).toBe('changed text')
  expect(await page.getAttribute(element, 'arr')).toBe('[1,2,3,4]')
  expect(await page.getAttribute(element, 'obj')).toBe(
    '{"nested":{"prop":"changed value"}}'
  )
})
