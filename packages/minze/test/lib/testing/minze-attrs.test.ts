import { test, expect } from '@playwright/test'
import { setup } from '@/utils'

test.describe('MinzeAttrs', () => {
  test.beforeEach(async ({ page }) => {
    await setup(page, '<minze-attrs></minze-attrs>')
  })

  test('types', async ({ page }) => {
    await expect(page.locator('.count')).toHaveText('0')
    await expect(page.locator('minze-attrs')).toHaveAttribute('count', '0')

    await expect(page.locator('.shorthand')).toHaveText('object') // null object
    await expect(page.locator('minze-attrs')).not.toHaveAttribute(
      'shorthand',
      'null'
    )

    await expect(page.locator('.empty')).toHaveText('object') // null object
    await expect(page.locator('minze-attrs')).not.toHaveAttribute(
      'empty',
      'null'
    )

    await expect(page.locator('.undefined')).toHaveText('undefined')
    await expect(page.locator('minze-attrs')).toHaveAttribute(
      'undefined',
      'undefined'
    )

    await expect(page.locator('.null')).toHaveText('object') // null object
    await expect(page.locator('minze-attrs')).toHaveAttribute('null', 'null')

    await expect(page.locator('.boolean')).toHaveText('boolean')
    await expect(page.locator('minze-attrs')).toHaveAttribute(
      'boolean',
      'false'
    )

    await expect(page.locator('.int')).toHaveText('number')
    await expect(page.locator('minze-attrs')).toHaveAttribute('int', '1')

    await expect(page.locator('.float')).toHaveText('number')
    await expect(page.locator('minze-attrs')).toHaveAttribute('float', '1.1')

    await expect(page.locator('.object')).toHaveText('object')
    await expect(page.locator('minze-attrs')).toHaveAttribute(
      'object',
      '{"key":"value"}'
    )
  })

  test('reactivity', async ({ page }) => {
    await expect(page.locator('.count')).toHaveText('0')
    await expect(page.locator('minze-attrs')).toHaveAttribute('count', '0')

    await page.locator('minze-attrs').evaluate((node) => {
      node.setAttribute('count', '1')
    })

    await expect(page.locator('.count')).toHaveText('1')
    await expect(page.locator('minze-attrs')).toHaveAttribute('count', '1')
  })
})
