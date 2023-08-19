import { MinzeElement } from './minze-element'
import { warn } from './utils'

/**
 * Minze: Global class with helpful static methods.
 */
export class Minze {
  /**
   * The current Minze version.
   */
  static readonly version = __VERSION__

  /**
   * Defines a custom element.
   *
   * @param name - The name of the custom element.
   * @param element - The element extending the MinzeElement class.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {}
   * Minze.define('my-element', MyElement)
   * ```
   */
  static define(name: string, element: typeof MinzeElement) {
    customElements.get(name) ?? customElements.define(name, element)
  }

  /**
   * Defines multiple custom elements.
   *
   * All class names have to be in PascalCase for automatic dash-case name conversion.
   * Example: `MinzeElement` will be registered as `<minze-element></minze-element>`.
   *
   * The parameters filter and keys have only an effect when elementsOrModules is actually a
   * module-map. E.g. Object returned by vite `import.meta.glob`.
   *
   * @param elementsOrModules - A module object, a module-map or an array of Minze elements.
   * @param filter - An array of keys that narrows down which modules of a module-map should be defined.
   * @param keys - A callback function that will be applied to every key.
   *
   * @default
   * keys = (key) => key.replace(/^\.\/lib\/|\.(ts|js)$/gi, '') // removes './lib/', '.ts' and '.js'
   *
   * @example
   * ```
   * // array
   * import { MinzeElement, MinzeElementTwo } from './elements'
   * Minze.defineAll([ MinzeElement, MinzeElementTwo ])
   *
   * // module
   * import * as elements from './elements'
   * Minze.defineAll(elements)
   *
   * // module-map
   * const modules = {
   *   'element': () => import('./path/to/file.js')
   * }
   * Minze.defineAll(modules)
   *
   * // module-map (vite)
   * const modules = import.meta.glob('./lib/*.@(ts|js)')
   * Minze.defineAll(modules)
   * ```
   */
  static defineAll(
    elementsOrModules:
      | (typeof MinzeElement)[]
      | Record<string, unknown | (() => Promise<unknown>)>,
    filter?: string[] | null,
    keys: ((key: string) => string) | false | null = (key) =>
      key.replace(/^\.\/lib\/|\.(ts|js)$/gi, '')
  ) {
    const isMinzeElement = (x: unknown): x is typeof MinzeElement => {
      return (
        typeof x === 'function' &&
        'define' in x &&
        typeof x.define === 'function'
      )
    }

    if (
      !Array.isArray(elementsOrModules) &&
      Array.isArray(filter) &&
      filter.every((x) => typeof x === 'string')
    ) {
      elementsOrModules = Minze.enhanceModules(elementsOrModules, filter, keys)
    }

    // defines a MinzeElement
    function defineMinzeElement(el: unknown) {
      if (isMinzeElement(el)) el.define()
    }

    // defines all MinzeElements in a module
    function defineModule(modules: unknown) {
      if (typeof modules === 'object' && modules !== null) {
        Object.values(modules).forEach(async (el) => {
          defineMinzeElement(el)
        })
      }
    }

    // iterate over all values in array, module or module-map
    Object.values(elementsOrModules).forEach(async (el) => {
      if (isMinzeElement(el)) defineMinzeElement(el)
      // module-map
      else if (typeof el === 'object' || typeof el === 'function') {
        const module = typeof el === 'function' ? await el() : el

        if (isMinzeElement(module)) defineMinzeElement(module)
        else defineModule(module)
      }
    })
  }

  /**
   * Creates an enhanced consumable map of modules for `Minze.defineAll`.
   *
   * @param modules - A module object.
   * @param filter - An array of strings that narrows down which modules should be included.
   * @param keys - A callback function that will be applied to every key.
   *
   * @example
   * ```
   * Minze.enhanceModules(modules, ['first-module', 'second-module'], (key) => key)
   * ```
   */
  private static enhanceModules(
    modules: Record<string, unknown | (() => Promise<unknown>)>,
    filter?: string[],
    keys?: ((key: string) => string) | false | null
  ) {
    return Object.fromEntries(
      Object.entries(modules)
        .map(([k, v]) => {
          if (keys && typeof keys === 'function') k = keys(k)
          return filter?.includes(k) || !filter ? [k, v] : []
        })
        .filter((arr) => arr.length)
    )
  }

  /**
   * Dispatches a custom event on the `window` object.
   *
   * @param eventName - The name of the event.
   * @param detail - The detail data to be passed with the event.
   *
   * @example
   * ```
   * Minze.dispatch('minze:update', { amount: 10 })
   * ```
   */
  static dispatch(eventName: string, detail?: unknown) {
    dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
        cancelable: true
      })
    )
  }

  /**
   * @deprecated use dispatch instead.
   */
  static cast(eventName: string, detail?: unknown) {
    warn('cast is deprecated use dispatch instead.')
    this.dispatch(eventName, detail)
  }

  /**
   * Adds an event listener to the `window` object
   * for the provided event name and callback function.
   *
   * @param eventName - The name of the event.
   * @param callback - The callback function to be called when the event is dispatched.
   *
   * @example
   * ```
   * Minze.listen('minze:update', (event) => {})
   * ```
   */
  static listen(eventName: string, callback: (event: any) => void) {
    addEventListener(eventName, callback)
  }

  /**
   * Removes event listener based on the provided event name and
   * callback function from the `window` object.
   *
   * @param eventName - The name of the event.
   * @param callback - The callback function to be removed.
   *
   * @example
   * ```
   * Minze.stopListen('minze:update', (event) => {})
   * ```
   */
  static stopListen(eventName: string, callback: (event: any) => void) {
    removeEventListener(eventName, callback)
  }
}
