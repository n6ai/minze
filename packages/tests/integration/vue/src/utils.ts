import { Page } from '@playwright/test'

/**
 * Navigates to http://localhost:3000/integration-vue/
 */
export async function start(page: Page) {
  await page.goto('integration/vue/')
}
