import { test, expect } from '@playwright/test'

test.describe('MinzeLogo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => {
      const app = document.querySelector<HTMLDivElement>('#app')
      if (app) app.innerHTML = '<minze-logo></minze-logo>'
    })
  })

  test('html', async ({ page }) => {
    await expect(page.locator('minze-logo svg')).toBeVisible()
  })

  test('attrs', async ({ page }) => {
    await expect(page.locator('minze-logo')).toHaveAttribute('width', '347')
    await expect(page.locator('minze-logo')).toHaveAttribute('height', '146')
  })
})
