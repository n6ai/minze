import { Page } from '@playwright/test'

/**
 * Navigates to http://localhost:3000/tests/minze/
 */
export async function start(page: Page) {
  await page.goto('minze/')
}

/**
 * Appends provided template into the #app element.
 *
 * @example
 * ```
 * appendToApp(`<div>test</div>`)
 */
export function appendToApp(template: string) {
  const app = document.querySelector<HTMLDivElement>('#app') ?? null
  if (app) app.innerHTML += template
}
