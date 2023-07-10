import { test, expect } from '@playwright/test'
import { start } from '@tests/minze-element/utils'

const element = 'minze-selectors'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `
    <${element}>
      <h1 slot="named-slot"></h1>
      <p></p>
    </${element}>
  `
  await start(page, template)

  const selectorDiv1 = `${element} .div-1`
  const selectorDiv2 = `${element} .div-2`

  expect(await page.locator(selectorDiv1).getAttribute('class')).toBe(
    'div-1 selected-all'
  )
  expect(await page.locator(selectorDiv2).getAttribute('class')).toBe(
    'div-2 selected selected-all'
  )

  const selectorSlotNamed = `${element} h1`
  const selectorSlotDefault = `${element} p`

  expect(await page.locator(selectorSlotNamed).getAttribute('class')).toBe(
    'slotted-named'
  )
  expect(await page.locator(selectorSlotDefault).getAttribute('class')).toBe(
    'slotted-default'
  )
})
