import { Page } from '@playwright/test'

/**
 * Navigates to http://localhost:3000/tests/
 * and inserts the provided template into <div id="app"></div>.
 *
 * @example
 * ```
 * test('minze-options', async ({ page }) => {
 *   await start(page, '<minze-options></minze-options>')
 * })
 * ```
 */
export async function start(page: Page, template: string) {
  await page.goto('')

  await page.locator('#app').evaluate((node, template) => {
    node.innerHTML = template
  }, template)
}
