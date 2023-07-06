import { test, expect } from '@playwright/test'
import { start } from '@minze-element/utils.js'

const element = 'minze-selectors'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selectorDiv1 = `${element} .div-1`
  const selectorDiv2 = `${element} .div-2`

  expect(await page.locator(selectorDiv1).getAttribute('class')).toBe(
    'div-1 selected-all'
  )
  expect(await page.locator(selectorDiv2).getAttribute('class')).toBe(
    'div-2 selected selected-all'
  )
})
