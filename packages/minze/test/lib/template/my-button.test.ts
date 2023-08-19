import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MyButton', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<my-button></my-button>')
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
