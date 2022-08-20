import type { Page } from '@playwright/test'

/**
 * Navigates to http://localhost:5173/integration-react/
 */
export async function start(page: Page) {
  await page.goto('integration/react/')
}
