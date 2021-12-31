import { Page } from '@playwright/test'

/**
 * Navigates to http://localhost:3000/tests/
 * and inserts the provided element into <div id="app"></div>.
 *
 * @example
 * ```
 * test('minze-options', async ({ page }) => {
 *   await start(page, 'minze-options')
 * })
 * ```
 */
export async function start(page: Page, element: string) {
  const template = `<${element}></${element}>`

  await page.goto('')
  await page.$eval(
    '#app',
    (el: HTMLDivElement, template) => (el.innerHTML = template),
    template
  )
}
