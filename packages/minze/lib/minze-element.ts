/**
 * Types
 */
export type MinzeEvent = [
  listenerTarget: string | MinzeElement | typeof window | typeof document,
  type: string,
  fn: (event: Event) => void
]

/**
 * Base MinzeElement class
 */
export class MinzeElement extends HTMLElement {
  data?: Record<string, unknown>
  eventListeners?: MinzeEvent[]
  html?(): string
  css?(): string

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  /**
   * Runs whenever the element is appended
   * into a document-connected element
   */
  connectedCallback() {
    this.render()
  }

  /**
   * Runs each time the element is disconnected
   * from the document's DOM
   */
  disconnectedCallback() {
    this.registerEvents('remove')
  }

  /**
   * Renders the template into the shadow DOM
   * and attaches all event listeners
   */
  render() {
    this.registerEvents('remove')

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = this.template()
    }

    this.registerEvents('add')
  }

  /**
   * Creates the template for the shadow root
   */
  template() {
    return `
      ${this.css && this.css() !== '' ? `<style>${this.css()}</style>` : ''}
      ${(this.html && this.html()) || '<slot></slot>'}
    `
  }

  /**
   * Dispatches a custom event from the element
   * with the prefix `minze:`
   *
   * Usage: this.cast('update', { amount: 10 })
   *
   * When listening for an event, write `minze:` infront of the event name
   * Example: addEventListener(`minze:update`, (event) => {})
   */
  cast(id: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(`minze:${id}`, {
        detail
      })
    )
  }

  /**
   * Adds or removes all event listeners defined in the eventListeners property
   *
   * possible targets are:
   * > global: window, document (limited only to these to to prevent global polution)
   * > local: this, or any elements inside the shadow DOM (by passing a valid CSS selector string)
   */
  private registerEvents(action: 'add' | 'remove') {
    if (this.eventListeners?.length) {
      this.eventListeners.forEach((eventTuple) => {
        const [listenerTarget, type, fn] = eventTuple

        let elements:
          | NodeList
          | MinzeElement[]
          | typeof document[]
          | typeof window[]
          | undefined

        if (listenerTarget === document) {
          elements = [document]
        } else if (listenerTarget === window) {
          elements = [window]
        } else if (listenerTarget instanceof MinzeElement) {
          elements = [this]
        } else if (typeof listenerTarget === 'string') {
          elements = this.shadowRoot?.querySelectorAll(listenerTarget)
        }

        elements?.forEach((element) => {
          action === 'add'
            ? element.addEventListener(type, fn, true)
            : element.removeEventListener(type, fn, true)
        })
      })
    }
  }
}
