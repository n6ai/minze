import { describe, test, expect, vi } from 'vitest'
import { Minze, MinzeElement } from 'minze'

describe('Minze', () => {
  test('version', () => {
    expect(Minze.version).toMatch(
      /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
    )
  })

  test('define', () => {
    class TestElement extends MinzeElement {}
    Minze.define('test-el', TestElement)

    expect(customElements.get('test-el')).toBeTruthy()
  })

  test('defineAll', () => {
    class TestElementOne extends MinzeElement {}
    class TestElementTwo extends MinzeElement {}

    Minze.defineAll([TestElementOne, TestElementTwo])

    expect(customElements.get('test-element-one')).toBeTruthy()
    expect(customElements.get('test-element-two')).toBeTruthy()
  })

  test('dispatch,listen,stopListen', () => {
    const callback = {
      fn: () => Minze.stopListen('minze:event', callback.fn)
    }

    const spy = vi.spyOn(callback, 'fn')

    Minze.listen('minze:event', callback.fn)
    Minze.dispatch('minze:event')
    Minze.dispatch('minze:event')

    expect(spy).toHaveBeenCalledOnce()
  })
})
