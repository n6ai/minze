import { Page } from '@playwright/test'

/**
 * Navigates to http://localhost:3000/tests/minze/
 */
export async function start(page: Page) {
  await page.goto('minze/')
}
