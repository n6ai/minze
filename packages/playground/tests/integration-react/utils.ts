import { Page } from '@playwright/test'

/**
 * Navigates to http://localhost:3000/tests/integration-react/
 */
export async function start(page: Page) {
  await page.goto('integration-react/')
}
