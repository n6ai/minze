import { test, expect } from '@playwright/test'

test.describe('MyElement', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.setContent('<my-element><h1>Minze + Vite</h1></my-element>')
  })

  test('reactive', async ({ page }) => {
    const el = page.locator('my-button')
    await expect(el).toContainText('count is 0')
    el.click()
    await expect(el).toContainText('count is 1')
  })

  test('html', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toHaveText('Minze + Vite')
    await expect(page.locator('minze-logo svg')).toBeVisible()
    await expect(page.locator('vite-logo svg')).toBeVisible()
    await expect(page.locator('my-button button')).toBeVisible()
  })

  test('css', async ({ page }) => {
    await expect(page.locator('my-element')).toHaveCSS('max-width', '1280px')
  })
})
