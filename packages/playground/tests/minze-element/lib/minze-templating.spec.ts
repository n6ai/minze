import { test, expect } from '@playwright/test'
import { start } from 'playground/tests/minze-element/utils'

const element = 'minze-templating'

test(element, async ({ page }) => {
  const template = `<${element}>Hello Minze!</${element}>`
  await start(page, template)

  const selector = `${element}`

  expect(await page.locator(selector).innerText()).toBe('Hello Minze!')

  await expect(page.locator(selector)).toHaveCSS('box-sizing', 'border-box')
  await expect(page.locator(selector)).toHaveCSS('display', 'block')
  await expect(page.locator(selector)).toHaveCSS(
    'background-color',
    'rgb(55, 245, 220)'
  )

  await page.locator(element).evaluate((node) => {
    node.setAttribute('hidden', '')
  })

  await expect(page.locator(selector)).toHaveCSS('display', 'none')
})
