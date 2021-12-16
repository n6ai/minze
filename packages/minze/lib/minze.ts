import { pascalToDashCase } from './utils'
import { MinzeElement } from './minze-element'

/**
 * Base Minze class
 */
export class Minze {
  /**
   * Defines a custom element
   *
   * Usage:
   * Minze.define('minze-element', MinzeElement)
   */
  static define(name: string, element: typeof MinzeElement) {
    customElements.define(name, element)
  }

  /**
   * Defines multiple custom elements
   * All class names have to be either PascalCase or camelCase
   * for automatic dash-case name conversion
   *
   * Usage:
   * Minze.define([ MinzeElement, MinzeElementTwo ])
   *
   * <minze-element></minze-element>
   * <minze-element-two></minze-element-two>
   */
  static defineAll(elements: typeof MinzeElement[]) {
    elements.forEach((element) => {
      const name = pascalToDashCase(element.name)
      customElements.define(name, element)
    })
  }

  /**
   * Dispatches a custom event from the element
   * with the prefix `minze:`
   *
   * Usage: Minze.cast('update', { amount: 10 })
   *
   * When listening for an event, write `minze:` infront of the event name
   * Example: addEventListener(`minze:update`, (event) => {})
   */
  static cast(id: string, detail?: unknown) {
    dispatchEvent(
      new CustomEvent(`minze:${id}`, {
        detail
      })
    )
  }

  /**
   * Listens for events
   * Usage: Minze.listen('update', (event) => {})
   */
  static listen(id: string, callback: (event: Event) => void) {
    addEventListener(`minze:${id}`, callback, true)
  }

  /**
   * Removes event listeners
   * Usage: Minze.stopListen('update', (event) => {})
   */
  static stopListen(id: string, callback: (event: Event) => void) {
    removeEventListener(`minze:${id}`, callback, true)
  }
}
