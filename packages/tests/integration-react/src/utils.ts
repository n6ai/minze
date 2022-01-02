import { Page } from '@playwright/test'

/**
 * Navigates to http://localhost:3000/integration-react/
 */
export async function start(page: Page) {
  await page.goto('integration-react/')
}
