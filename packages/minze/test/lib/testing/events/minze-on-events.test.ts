import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeOnEvents', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-on-events></minze-on-events>')
  })

  test('click (on:)', async ({ page }) => {
    await expect(page.locator('.on')).toHaveText('not-clicked')
    await page.click('.on')
    await expect(page.locator('.on')).toHaveText('clicked')
  })

  test('click (@)', async ({ page }) => {
    await expect(page.locator('.at')).toHaveText('not-clicked')
    await page.click('.at')
    await expect(page.locator('.at')).toHaveText('clicked')
  })
})
