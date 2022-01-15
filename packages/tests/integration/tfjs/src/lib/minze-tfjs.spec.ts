import { test, expect } from '@playwright/test'
import { start } from '../utils'

const element = 'minze-tfjs'

test('Integration: tfjs', async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  expect(await page.locator(`${element} .prediction`).innerText()).toMatch(
    /^\d{3}\.\d+$/
  )
})
