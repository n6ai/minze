import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeExportparts', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-exportparts></minze-exportparts>')
  })

  test('exportparts (static)', async ({ page }) => {
    await expect(page.locator('minze-exportparts')).toHaveAttribute(
      'exportparts',
      'button, button--primary'
    )
  })

  test('exportparts (dynamic)', async ({ page }) => {
    await page.click('button')

    await expect(page.locator('minze-exportparts')).toHaveAttribute(
      'exportparts',
      'another-part, button, button--primary'
    )
  })
})
