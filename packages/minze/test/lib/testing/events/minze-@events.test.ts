import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeAtEvents', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-at-events></minze-at-events>')
  })

  test('click', async ({ page }) => {
    await expect(page.locator('button')).toHaveText('not-clicked')
    await page.click('button')
    await expect(page.locator('button')).toHaveText('clicked')
  })
})
