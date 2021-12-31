import { test, expect } from '@playwright/test'
import { start } from 'playground/tests/minze/utils'

test('Minze: define', async ({ page }) => {
  await start(page)

  expect(await page.locator('minze-define-one div').innerText()).toBe('test')
  expect(await page.locator('minze-define-two div').innerText()).toBe('test')
  expect(await page.locator('minze-define-three div').innerText()).toBe('test')
})
