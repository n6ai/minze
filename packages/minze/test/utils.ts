import type { Page } from '@playwright/test'

/**
 * Navigates to '/' and injects provided markup into the DOM.
 *
 * @param page - Playwright page object.
 * @param html - A string with HTML markup.
 *
 * @example
 * import { test, expect } from '@playwright/test'
 * import { setup } from '@/utils'
 *
 * test.describe('MyElement', () => {
 *   test.beforeEach(async ({ page }) => {
 *     await setup(page, '<my-element></my-element>')
 *   })
 *
 *   test('html', async ({ page }) => {
 *     await expect(page.locator('my-element')).toBeVisible()
 *   })
 * })
 */
export async function setup(page: Page, html: string) {
  await page.goto('/')

  await page.evaluate((html) => {
    const app = document.querySelector<HTMLDivElement>('#app')
    if (app) app.innerHTML = html
  }, html)
}
