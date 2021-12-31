import { test, expect } from '@playwright/test'
import { start } from 'playground/tests/utils'

const element = 'minze-hooks'

test(element, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selector = `${element} div`

  const hookSequence = [
    'onStart',
    'beforeAttributeChange',
    'beforeRender',
    'onAttributeChange',
    'onRender',
    'onReady'
  ].join(' ')

  expect(await page.locator(selector).innerText()).toBe(hookSequence)

  // move the element withing the same document
  await page.locator('#app').evaluate((node, element) => {
    node.appendChild(node.querySelector(`${element}`))
  }, element)

  const movedHookSequence = [
    'onDestroy',
    'onStart',
    'beforeRender',
    'onRender',
    'onReady'
  ].join(' ')

  expect(await page.locator(selector).innerText()).toBe(movedHookSequence)
})
