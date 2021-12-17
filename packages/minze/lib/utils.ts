/**
 * Converts a camelCase or PascalCase string to kebab-case.
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
 * Converts a kebab-case string to camelCase.
 *
 * @example
 * ```
 * dashToCamelCase('some-string') // 'someString'
 */
export function dashToCamel(value: string) {
  return value.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}
