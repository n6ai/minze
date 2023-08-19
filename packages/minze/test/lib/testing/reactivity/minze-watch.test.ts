import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeWatch', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-watch></minze-watch>')
  })

  test('reactivity', async ({ page }) => {
    await expect(page.locator('.str')).toHaveText('')
    await expect(page.locator('.arr')).toHaveText('')
    await expect(page.locator('.obj')).toHaveText('')

    await page.click('button')

    await expect(page.locator('.str')).toHaveText(
      'changed text, initial text, str, [object HTMLElement]'
    )
    await expect(page.locator('.arr')).toHaveText('4, undefined, 3, 1,2,3,4')
    await expect(page.locator('.obj')).toHaveText(
      'changed value, initial value, prop, [object Object]'
    )
  })
})
