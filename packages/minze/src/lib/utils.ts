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
 * Creates an mutation observer and starts observation.
 *
 * @param element - The element node to observe.
 * @param callback - Mutation observer Callback function.
 * @param options - Mutation observer options. If non provided default options will be used.
 *
 * @default
 * options = { attributes: true, childList: true, subtree: true }
 *
 * @example
 * ```
 * createObserver(this, () => {}, { attributes})
 * ```
 */
export function createObserver(
  element: Node | ShadowRoot,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    childList: true,
    subtree: true
  }
) {
  const observer = new MutationObserver(callback)
  observer.observe(element, options)

  return observer
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
