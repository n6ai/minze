import type { MinzeElement } from './minze-element'
import { camelToDash } from './utils'

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
    customElements.define(name, element)
  }

  /**
   * Defines multiple custom elements.
   *
   * All class names have to be either PascalCase or camelCase for automatic dash-case name conversion.
   * Example: `MinzeElement` will be registered as `<minze-element></minze-element>`.
   *
   * @param elements - A module object or an array of custom Minze elements.
   *
   * @example
   * ```
   * import * as Elements from './module'
   * Minze.defineAll(Elements)
   * // or
   * import { MinzeElement, MinzeElementTwo } from './module'
   * Minze.define([ MinzeElement, MinzeElementTwo ])
   * ```
   */
  static defineAll(
    elements: typeof MinzeElement[] | Record<string, typeof MinzeElement>
  ) {
    if (!Array.isArray(elements)) {
      elements = Object.values(elements)
    }

    elements.forEach((element) => {
      const name = camelToDash(element.name)
      customElements.define(name, element)
    })
  }

  /**
   * Dispatches a custom event on the `window` object.
   *
   * @param eventName - The name of the event.
   * @param detail - The detail data to be passed with the event.
   *
   * @example
   * ```
   * Minze.cast('minze:update', { amount: 10 })
   * ```
   */
  static cast(eventName: string, detail?: unknown) {
    dispatchEvent(new CustomEvent(eventName, { detail }))
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
