import { MinzeElement } from './minze-element'

/**
 * Base Minze class with multiple helper methods
 */
export class Minze {
  static define(name: string, element: typeof MinzeElement) {
    customElements.define(name, element)
  }
}
