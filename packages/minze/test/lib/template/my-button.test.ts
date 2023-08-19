import { test, expect } from '@playwright/test'

test.describe('MyButton', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.setContent('<my-button></my-button>')
  })

  test('html', async ({ page }) => {
    await expect(page.locator('my-button button')).toBeVisible()
  })

  test('css', async ({ page }) => {
    await expect(page.locator('my-button button')).toHaveCSS(
      'border-radius',
      '8px'
    )
  })
})
