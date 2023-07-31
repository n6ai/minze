import { describe, it, expect, vi } from 'vitest'
import {
  isProxy,
  camelToDash,
  dashToCamel,
  createObserver,
  warn
} from 'minze/src/lib/utils'

describe('isProxy', () => {
  it('should return true if the object is a proxy', () => {
    const obj: Record<string | symbol, unknown> = new Proxy(
      {},
      {
        get: (target: object, prop: symbol) => {
          if (prop === isProxy) return true
        }
      }
    )

    expect(obj[isProxy]).toBe(true)
  })

  it('should return false if the object is not a proxy', () => {
    const obj: Record<string | symbol, unknown> = {}

    expect(obj[isProxy]).toBeFalsy()
  })
})

describe('camelToDash', () => {
  const data = [
    { input: 'camel', expected: 'camel' },
    { input: 'camelCase', expected: 'camel-case' },
    { input: 'camelCaseString', expected: 'camel-case-string' },
    { input: 'Pascal', expected: 'pascal' },
    { input: 'PascalCase', expected: 'pascal-case' },
    { input: 'PascalCaseString', expected: 'pascal-case-string' }
  ]

  it.each(data)(
    'should transform $input to $expected',
    ({ input, expected }) => {
      expect(camelToDash(input)).toBe(expected)
    }
  )
})

describe('dashToCamel', () => {
  const data = [
    { input: 'dash', expected: 'dash' },
    { input: 'dash-case', expected: 'dashCase' },
    { input: 'dash-case-string', expected: 'dashCaseString' }
  ]

  it.each(data)(
    'should transform $input to $expected',
    ({ input, expected }) => {
      expect(dashToCamel(input)).toBe(expected)
    }
  )
})

// @vitest-environment jsdom
describe('createObserver', () => {
  it('should return an Mutation Observer', () => {
    const element = document.createElement('div')
    const observer = createObserver(element, () => {})

    expect(observer).toBeInstanceOf(MutationObserver)
  })
})

describe('warn', () => {
  vi.spyOn(global.console, 'warn')

  const data = [
    { input: 'Hello Minze!', expected: '[Minze warn] Hello Minze!' }
  ]

  it.each(data)(
    'should take $input and display $expected',
    ({ input, expected }) => {
      warn(input)
      expect(console.warn).toBeCalledTimes(1)
      expect(console.warn).toBeCalledWith(expected)
    }
  )
})
