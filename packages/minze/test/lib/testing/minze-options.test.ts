import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeOptions', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-options></minze-options>')
  })

  test('cssReset', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCSS('margin', '0px')
  })

  test('[rendered]', async ({ page }) => {
    await expect(page.locator('minze-options')).toHaveAttribute('rendered', '')
  })
})
