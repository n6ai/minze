/**
 * Types
 */
export type minzeEvent = [part: string, type: string, fn: () => void]

/**
 * Base MinzeElement class
 */
export class MinzeElement extends HTMLElement {
  data?: Record<string, unknown>
  events?: minzeEvent[]
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
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = this.template()
      this.registerEvents('add')
    }
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
   * Adds or removes all event listeners
   * inside the events property
   */
  private registerEvents(action: 'add' | 'remove') {
    if (this.events?.length) {
      this.events.forEach((eventTuple) => {
        const [part, type, fn] = eventTuple

        if (
          typeof part === 'string' &&
          typeof type === 'string' &&
          typeof fn === 'function'
        ) {
          const parts = this.shadowRoot?.querySelectorAll(`[part='${part}']`)

          parts?.forEach((part) => {
            action === 'add'
              ? part.addEventListener(type, fn)
              : part.removeEventListener(type, fn)
          })
        }
      })
    }
  }
}
