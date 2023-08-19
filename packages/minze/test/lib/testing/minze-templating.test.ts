import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeTemplating', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-templating>Hello Minze!</minze-templating>')
  })

  test('html', async ({ page }) => {
    await expect(page.locator('minze-templating')).toContainText('Hello Minze!')
  })

  test('css', async ({ page }) => {
    await expect(page.locator('minze-templating')).toHaveCSS(
      'box-sizing',
      'border-box'
    )
    await expect(page.locator('minze-templating')).toHaveCSS('display', 'block')
    await expect(page.locator('minze-templating')).toHaveCSS(
      'background-color',
      'rgb(55, 245, 220)'
    )
  })

  test('[hidden]', async ({ page }) => {
    await page.locator('minze-templating').evaluate((node) => {
      node.setAttribute('hidden', '')
    })

    await expect(page.locator('minze-templating')).toHaveCSS('display', 'none')
  })
})
