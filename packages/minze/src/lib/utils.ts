/**
 * Creates a symbol that makes it possible to check
 * if an object is a proxy.
 */
export const isProxy = Symbol('isProxy')

/**
 * Converts a camelCase or PascalCase string to dash-case.
 *
 * @param value - The string to convert.
 *
 * @example
 * ```
 * camelToDashCase('someString') // 'some-string'
 * ```
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
 * @param value - The string to convert.
 *
 * @example
 * ```
 * dashToCamelCase('some-string') // 'someString'
 * ```
 */
export function dashToCamel(value: string) {
  return value.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

/**
 * Logs a waring to the console.
 *
 * @param msg - The message to log.
 *
 * @example
 * ```
 * warn('This is a warning')
 * ```
 */
export function warn(msg: string, ...args: unknown[]) {
  console.warn(`[Minze warn] ${msg}`, ...args)
}

/**
 * Tags template literals for HTML syntax highlighting.
 *
 * @param value - Template literal.
 *
 * @example
 * ```
 * myElement extends MinzeElement {
 *   html = () => html`
 *     <div>Hello Minze!</div>
 *   `
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const html = (value: TemplateStringsArray, ...args: unknown[]) => value

/**
 * Tags template literals for CSS syntax highlighting.
 *
 * @param value - Template literal.
 *
 * @example
 * ```
 * myElement extends MinzeElement {
 *   css = () => css`
 *     :host {
 *       display: flex;
 *     }
 *   `
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const css = (value: TemplateStringsArray, ...args: unknown[]) => value
