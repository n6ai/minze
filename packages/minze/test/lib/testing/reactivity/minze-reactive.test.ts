import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeReactive', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-reactive></minze-reactive>')
  })

  test('reactivity', async ({ page }) => {
    await expect(page.locator('.shorthand')).toHaveText('null')
    await expect(page.locator('.str')).toHaveText('initial text')
    await expect(page.locator('.arr')).toHaveText('1,2,3')
    await expect(page.locator('.obj')).toHaveText('initial value')

    await expect(page.locator('minze-reactive')).not.toHaveAttribute(
      'shorthand',
      'null'
    )
    await expect(page.locator('minze-reactive')).toHaveAttribute(
      'str',
      'initial text'
    )
    await expect(page.locator('minze-reactive')).toHaveAttribute(
      'arr',
      '[1,2,3]'
    )
    await expect(page.locator('minze-reactive')).toHaveAttribute(
      'obj',
      '{"nested":{"prop":"initial value"}}'
    )

    await page.click('button')

    await expect(page.locator('.shorthand')).toHaveText('not null')
    await expect(page.locator('.str')).toHaveText('changed text')
    await expect(page.locator('.arr')).toHaveText('1,2,3,4')
    await expect(page.locator('.obj')).toHaveText('changed value')

    await expect(page.locator('.shorthand')).not.toHaveAttribute(
      'shorthand',
      'not null'
    )
    await expect(page.locator('minze-reactive')).toHaveAttribute(
      'str',
      'changed text'
    )
    await expect(page.locator('minze-reactive')).toHaveAttribute(
      'arr',
      '[1,2,3,4]'
    )
    await expect(page.locator('minze-reactive')).toHaveAttribute(
      'obj',
      '{"nested":{"prop":"changed value"}}'
    )
  })
})
