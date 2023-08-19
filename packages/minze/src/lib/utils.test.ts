import { describe, test, expect, vi } from 'vitest'
import {
  isProxy,
  camelToDash,
  dashToCamel,
  createObserver,
  warn
} from './utils'

describe('isProxy', () => {
  test('is true', () => {
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

  test('is false', () => {
    const obj: Record<string | symbol, unknown> = {}

    expect(obj[isProxy]).toBeFalsy()
  })
})

describe('camelToDash', () => {
  const data = [
    { input: 'camel', output: 'camel' },
    { input: 'camelCase', output: 'camel-case' },
    { input: 'camelCaseString', output: 'camel-case-string' },
    { input: 'Pascal', output: 'pascal' },
    { input: 'PascalCase', output: 'pascal-case' },
    { input: 'PascalCaseString', output: 'pascal-case-string' }
  ]

  test.each(data)('transforms $input to $output', ({ input, output }) => {
    expect(camelToDash(input)).toBe(output)
  })
})

describe('dashToCamel', () => {
  const data = [
    { input: 'dash', output: 'dash' },
    { input: 'dash-case', output: 'dashCase' },
    { input: 'dash-case-string', output: 'dashCaseString' }
  ]

  test.each(data)('transforms $input to $output', ({ input, output }) => {
    expect(dashToCamel(input)).toBe(output)
  })
})

describe('createObserver', () => {
  test('returns a Mutation Observer', () => {
    const element = document.createElement('div')
    const observer = createObserver(element, () => {})

    expect(observer).toBeInstanceOf(MutationObserver)
  })
})

describe('warn', () => {
  vi.spyOn(global.console, 'warn')

  const data = [{ input: 'Hello Minze!', output: '[Minze warn] Hello Minze!' }]

  test.each(data)('takes $input and displays $output', ({ input, output }) => {
    warn(input)
    expect(console.warn).toHaveBeenCalledOnce()
    expect(console.warn).toBeCalledWith(output)
  })
})
