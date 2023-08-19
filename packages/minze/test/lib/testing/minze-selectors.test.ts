import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeSelectors', () => {
  test.beforeEach(async ({ page }) => {
    const html = `
      <minze-selectors>
        <h1 slot="named-slot"></h1>
        <p></p>
      </minze-selectors>
    `

    await setup(page, html)
  })

  test('select', async ({ page }) => {
    await expect(page.locator('.div-1')).toHaveClass('div-1 selected')
  })

  test('selectAll', async ({ page }) => {
    await expect(page.locator('.div-1')).toHaveClass('div-1 selected')
    await expect(page.locator('.div-2')).toHaveClass('div-2 selected')
  })

  test('slotted', async ({ page }) => {
    await expect(page.locator('h1')).toHaveClass('named-slot')
    await expect(page.locator('p')).toHaveClass('default-slot')
  })
})
