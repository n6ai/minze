import { test, expect } from '@playwright/test'

test.describe('MyButton', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => {
      const app = document.querySelector<HTMLDivElement>('#app')
      if (app) app.innerHTML = '<my-button></my-button>'
    })
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
