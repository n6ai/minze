import { describe, test, expect } from 'vitest'
import { MinzeElement } from 'minze'

describe('MinzeElement', () => {
  class TestElement extends MinzeElement {}

  test('version', () => {
    expect(MinzeElement.version).toMatch(
      /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
    )
  })

  test('isMinzeElement', () => {
    expect(MinzeElement.isMinzeElement).toEqual(true)
  })

  test('name', () => {
    expect(TestElement.name).toBe('TestElement')
  })

  test('dashName', () => {
    expect(TestElement.dashName).toBe('test-element')
  })

  test('define', () => {
    TestElement.define('test-el')
    TestElement.define()

    expect(customElements.get('test-el')).toBeTruthy()
    expect(customElements.get('test-element')).toBeTruthy()
  })
})
