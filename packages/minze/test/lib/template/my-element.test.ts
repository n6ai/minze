import { test, expect } from '@playwright/test'

test.describe('MyElement', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => {
      const app = document.querySelector<HTMLDivElement>('#app')
      if (app) app.innerHTML = '<my-element><h1>Minze + Vite</h1></my-element>'
    })
  })

  test('reactive', async ({ page }) => {
    await expect(page.locator('my-button')).toContainText('count is 0')
    page.locator('my-button').click()
    await expect(page.locator('my-button')).toContainText('count is 1')
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
