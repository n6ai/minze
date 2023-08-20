import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeHooks', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-hooks></minze-hooks>')
  })

  test('hooks (common)', async ({ page }) => {
    const hookSequence = [
      'onStart',
      'onReactive',
      'beforeRender',
      'afterRender',
      'onReady'
    ].join(' ')

    await expect(page.locator('minze-hooks div')).toHaveText(hookSequence)
  })

  test('hooks (destroy)', async ({ page }) => {
    const hookSequence = [
      'onDestroy',
      'onStart',
      'onReactive',
      'beforeRender',
      'afterRender',
      'onReady'
    ].join(' ')

    // move the element within the same document
    await page.locator('#app').evaluate((node) => {
      const el = node.querySelector('minze-hooks')
      if (el) node.appendChild(el)
    })

    await expect(page.locator('minze-hooks div')).toHaveText(hookSequence)
  })
})
