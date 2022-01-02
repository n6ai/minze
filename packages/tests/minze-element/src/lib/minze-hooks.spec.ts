import { test, expect } from '@playwright/test'
import { start } from '../utils'

const element = 'minze-hooks'

test(`MinzeElement: ${element}`, async ({ page }) => {
  const template = `<${element}></${element}>`
  await start(page, template)

  const selector = `${element} div`

  const hookSequence = [
    'onStart',
    'beforeAttributeChange',
    'onReactive',
    'beforeRender',
    'onAttributeChange',
    'onRender',
    'onReady'
  ].join(' ')

  expect(await page.locator(selector).innerText()).toBe(hookSequence)

  // move the element withing the same document
  await page.locator('#app').evaluate((node, element) => {
    const el = node.querySelector(`${element}`)
    if (el) node.appendChild(el)
  }, element)

  const movedHookSequence = [
    'onDestroy',
    'onStart',
    'onReactive',
    'beforeRender',
    'onRender',
    'onReady'
  ].join(' ')

  expect(await page.locator(selector).innerText()).toBe(movedHookSequence)
})
