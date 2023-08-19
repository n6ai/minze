import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeLogo', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-logo></minze-logo>')
  })

  test('attrs', async ({ page }) => {
    await expect(page.locator('minze-logo')).toHaveAttribute('width', '347')
    await expect(page.locator('minze-logo')).toHaveAttribute('height', '146')
  })

  test('html', async ({ page }) => {
    await expect(page.locator('minze-logo svg')).toBeVisible()
  })
})
