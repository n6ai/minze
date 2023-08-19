import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeEventListeners', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-event-listeners></minze-event-listeners>')
  })

  test('click (dispatch)', async ({ page }) => {
    await expect(page.locator('.dispatch')).toHaveText('not-clicked')
    await page.click('.dispatch')
    await expect(page.locator('.dispatch')).toHaveText('clicked')
  })

  test('click (broadcast)', async ({ page }) => {
    await expect(page.locator('.broadcast')).toHaveText('not-clicked')
    await page.click('.broadcast')
    await expect(page.locator('.broadcast')).toHaveText('clicked')
  })
})
