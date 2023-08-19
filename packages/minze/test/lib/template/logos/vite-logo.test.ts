import { test, expect } from '@playwright/test'

test.describe('ViteLogo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.setContent('<vite-logo></vite-logo>')
  })

  test('attrs', async ({ page }) => {
    await expect(page.locator('vite-logo')).toHaveAttribute('width', '256')
    await expect(page.locator('vite-logo')).toHaveAttribute('height', '257')
  })

  test('html', async ({ page }) => {
    await expect(page.locator('vite-logo svg')).toBeVisible()
  })
})
