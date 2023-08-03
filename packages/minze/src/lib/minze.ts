import { MinzeElement } from './minze-element'
import { warn } from './utils'

/**
 * Minze class with multiple static methods and properties for common tasks.
 */
export class Minze {
  /**
   * The current Minze version.
   */
  static readonly version = '__VERSION__'

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
   * The parameters filter and mapRE are only used if elementsOrModules is actually a module.
   *
   * @param elementsOrModules - A module object or an array of Minze elements.
   * @param filter - An array of strings that narrows down which modules should be defined.
   * @param mapRE - A regular expression that is used to strip the matches from the module keys.
   *
   * @default
   * mapRE = /^\.\/lib\/|\.(ts|js)$/gi
   *
   * @example
   * ```
   * import * as elements from './module'
   * Minze.defineAll(elements)
   *
   * // or
   * import { MinzeElement, MinzeElementTwo } from './module'
   * Minze.defineAll([ MinzeElement, MinzeElementTwo ])
   *
   * // or for vite glob import
   * const modules = import.meta.glob('./lib/*.@(ts|js)')
   * Minze.defineAll(modules, ['first-module', 'second-module'])
   * ```
   */
  static defineAll(
    elementsOrModules:
      | (typeof MinzeElement)[]
      | Record<string, unknown | (() => Promise<unknown>)>,
    filter?: string[],
    mapRE: RegExp | false | null = /^\.\/lib\/|\.(ts|js)$/gi
  ) {
    if (
      !Array.isArray(elementsOrModules) &&
      Array.isArray(filter) &&
      filter.every((x) => typeof x === 'string')
    ) {
      elementsOrModules = Minze.enhanceModules(elementsOrModules, filter, mapRE)
    }

    Object.values(elementsOrModules).forEach(async (elOrM) => {
      if (
        typeof elOrM === 'function' &&
        'define' in elOrM &&
        typeof elOrM.define === 'function'
      ) {
        elOrM.define()
      } else if (typeof elOrM === 'object' || typeof elOrM === 'function') {
        const module = typeof elOrM === 'function' ? await elOrM() : elOrM

        if (typeof module === 'object') {
          Object.values(module).forEach(async (el) => {
            if (
              typeof el === 'function' &&
              'define' in el &&
              typeof el.define === 'function'
            ) {
              el.define()
            }
          })
        }
      }
    })
  }

  /**
   * Creates an enhanced consumable map of modules for `Minze.defineAll`.
   *
   * @param modules - A module object.
   * @param filter - An array of strings that narrows down which modules should be included.
   * @param mapRE - A regular expression that is used to strip the matches from the module keys.
   *
   * @example
   * ```
   * Minze.enhanceModules(modules, ['first-module', 'second-module'], /^\.\/lib\/|\.(ts|js)$/gi)
   * ```
   */
  private static enhanceModules(
    modules: Record<string, unknown | (() => Promise<unknown>)>,
    filter?: string[],
    mapRE?: RegExp | false | null
  ) {
    return Object.fromEntries(
      Object.entries(modules)
        .map(([k, v]) => {
          if (mapRE) k = k.replace(mapRE, '')
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
  static listen(eventName: string, callback: (event: Event) => void) {
    addEventListener(eventName, callback, true)
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
  static stopListen(eventName: string, callback: (event: Event) => void) {
    removeEventListener(eventName, callback, true)
  }
}
