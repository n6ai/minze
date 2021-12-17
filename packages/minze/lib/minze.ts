import { camelToDash } from './utils'
import { MinzeElement } from './minze-element'

/**
 * Minze class which can be used to run multiple utility methods.
 */
export class Minze {
  /**
   * Defines a custom element.
   *
   * @example
   * ```
   * Minze.define('minze-element', MinzeElement)
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
   * @example
   * ```
   * Minze.define([ MinzeElement, MinzeElementTwo ])
   * ```
   */
  static defineAll(elements: typeof MinzeElement[]) {
    elements.forEach((element) => {
      const name = camelToDash(element.name)
      customElements.define(name, element)
    })
  }

  /**
   * Dispatches a custom event on the `window` object.
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
   * @example
   * ```
   * Minze.listen('update', (event) => {})
   * ```
   */
  static listen(eventName: string, callback: (event: Event) => void) {
    addEventListener(eventName, callback, true)
  }

  /**
   * Removes event listener based on provided event name and
   * callback function from the `window` object.
   *
   * @example
   * ```
   * Minze.stopListen('update', (event) => {})
   * ```
   */
  static stopListen(eventName: string, callback: (event: Event) => void) {
    removeEventListener(eventName, callback, true)
  }
}
