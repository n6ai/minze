/**
 * Creates a symbol that makes it possible to check
 * if an object is a proxy.
 */
export const isProxy = Symbol('isProxy')

/**
 * Converts a camelCase or PascalCase string to dash-case.
 *
 * @example
 * ```
 * camelToDashCase('someString') // 'some-string'
 */
export function camelToDash(value: string) {
  return value
    .replace(/\B([A-Z])(?=[a-z])/g, '-$1')
    .replace(/\B([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * Converts a dash-case string to camelCase.
 *
 * @example
 * ```
 * dashToCamelCase('some-string') // 'someString'
 */
export function dashToCamel(value: string) {
  return value.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}
