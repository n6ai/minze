/**
 * Types
 */
export type minzeEvent = [
  selector: string | MinzeElement,
  type: string,
  fn: (event: Event) => void
]

/**
 * Base MinzeElement class
 */
export class MinzeElement extends HTMLElement {
  data?: Record<string, unknown>
  eventListeners?: minzeEvent[]
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
   * Dispatches a custom event
   */
  cast(id: string, detail: unknown) {
    this.dispatchEvent(
      new CustomEvent(`minze:${id}`, {
        detail
      })
    )
  }

  /**
   * Adds or removes all event listeners
   * defined in the eventListeners property
   */
  private registerEvents(action: 'add' | 'remove') {
    if (this.eventListeners?.length) {
      this.eventListeners.forEach((eventTuple) => {
        const [selector, type, fn] = eventTuple

        const elements =
          selector instanceof MinzeElement
            ? [this]
            : this.shadowRoot?.querySelectorAll(selector)

        elements?.forEach((element) => {
          action === 'add'
            ? element.addEventListener(type, fn)
            : element.removeEventListener(type, fn)
        })
      })
    }
  }
}
