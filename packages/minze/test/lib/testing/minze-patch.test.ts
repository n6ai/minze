import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzePatch', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-patch></minze-patch>')
  })

  test('html (patch)', async ({ page }) => {
    await page.fill('input', '99')
    await expect(page.locator('minze-patch')).toBeFocused()
  })

  test('html (re-render)', async ({ page }) => {
    await page.fill('input', '99')
    await page.click('button')
    await expect(page.locator('minze-patch')).not.toBeFocused()
  })
})
