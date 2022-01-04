import { test, expect } from '@playwright/test'
import { start } from '../utils'

const element = 'minze-reactive-watchers'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selectorStr = `${element} .str`
  const selectorArr = `${element} .arr`
  const selectorObj = `${element} .obj`

  expect(await page.locator(selectorStr).innerText()).toBe('')
  expect(await page.locator(selectorArr).innerText()).toBe('')
  expect(await page.locator(selectorObj).innerText()).toBe('')

  await page.click(`${element} button`)

  expect(await page.locator(selectorStr).innerText()).toBe(
    'changed text, initial text, str, [object HTMLElement]'
  )
  expect(await page.locator(selectorArr).innerText()).toBe(
    '4, undefined, 3, 1,2,3,4'
  )
  expect(await page.locator(selectorObj).innerText()).toBe(
    'changed value, initial value, prop, [object Object]'
  )
})
