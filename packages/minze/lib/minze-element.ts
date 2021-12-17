import { dashToCamel } from './utils'

/**
 * Types
 */
type MinzeRegisterAction = 'add' | 'remove'

export type MinzeEvent = [
  eventTarget: string | MinzeElement | typeof window | typeof document,
  eventName: string,
  callback: (event: Event) => void
]

/**
 * MinzeElement class witch can be extended from to create web components.
 *
 * @example
 * ```
 * class MyElement extends MinzeElement {
 *   html = () => `<div>Hello World</div>`
 * }
 * ```
 */
export class MinzeElement extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  /**
   * Optional data property.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   data: {
   *     active: false
   *   }
   * }
   * ```
   */
  data?: Record<string, unknown>

  /**
   * Props array which will be used to register attribute getters and setters.
   */
  props: string[] = []

  /**
   * Defines the shadow DOM HTML elements.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   html = () => `
   *     <div>Hello World</div>
   *   `
   * }
   * ```
   */
  html?(): string

  /**
   * Defines the shadow DOM styling.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   css = () => `
   *     :host {
   *       background: #000;
   *     }
   *   `
   * }
   * ```
   */
  css?(): string

  /**
   * Defines event listeners that will be registered when the element is rendered.
   *
   * eventListeners takes an array of tuples: [[ eventTarget, eventName, callback ], ...]
   *
   * possible event targets are:
   * - global: window, document (limited only to these to to prevent global polution)
   * - local: this, or any elements inside the shadow DOM (by passing a valid CSS selector string)
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   eventListeners = [
   *     ['.my-class', 'click', () => {}],
   *     [window, 'resize', () => {}],
   *     [this, 'minze:event', () => {}]
   *   ]
   * }
   * ```
   */
  eventListeners?: MinzeEvent[]

  /**
   * Defines default event listeners that always will be registered when the element is rendered.
   */
  private eventListenersFactory: MinzeEvent[] = [
    [this, 'minze:render', () => this.render()]
  ]

  /**
   * Lifecycle - Runs whenever the element is appended into a document-connected element.
   */
  connectedCallback() {
    this.render()
  }

  /**
   * Lifecycle - Runs each time the element is disconnected from the document's DOM.
   */
  disconnectedCallback() {
    this.registerAllEvents('remove')
  }

  /**
   * Lifecycle - Runs each time the element is moved to a new document.
   */
  adoptedCallback() {
    this.render()
  }

  /**
   * Lifecycle - Runs whenever one of the element's attributes is changed.
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name in this && newValue !== oldValue) {
      this.render()
    }
  }

  /**
   * Defines getters and setters for provided prop.
   *
   * @example
   * ```
   * this.registerProp(prop)
   * ```
   */
  registerProp(prop: string) {
    const propCamel = dashToCamel(prop)

    if (!(propCamel in this)) {
      Object.defineProperty(this, propCamel, {
        get: () => this.getAttribute(prop) ?? undefined,
        set: (value: unknown) => this.setAttribute(prop, `${value}`)
      })
    }
  }

  /**
   * Registers props for all provided props.
   *
   * @example
   * ```
   * this.registerProps(props)
   * ```
   */
  registerProps(props: string[]) {
    props.forEach((prop) => this.registerProp(prop))
  }

  /**
   * Registers for all provided props on the props property.
   *
   * @example
   * ```
   * this.registerAllProps()
   * ```
   */
  registerAllProps() {
    this.registerProps(this.props)
  }

  /**
   * Renders the template into the shadow DOM,
   * removes any previous event listeners and attaches all event listeners.
   *
   * @example
   * ```
   * this.render()
   * ```
   */
  render() {
    this.registerAllProps()

    if (this.shadowRoot) {
      const template = this.template()

      if (template !== this.cachedTemplate) {
        this.registerAllEvents('remove')

        this.shadowRoot.innerHTML = template
        this.cachedTemplate = template

        this.registerAllEvents('add')
      }
    }
  }

  /**
   * Creates the template for the shadow root, which will be inserted into the Shadow root.
   */
  template() {
    return `
      ${this.css && this.css() !== '' ? `<style>${this.css()}</style>` : ''}
      ${(this.html && this.html()) || '<slot></slot>'}
    `
  }

  /**
   * Stores the previously rendered template.
   */
  private cachedTemplate: string | undefined

  /**
   * Dispatches a custom event from the web component.
   *
   * Is's a good idea to namespace the event name. For example: `minze:render`
   *
   * @example
   * ```
   * this.cast('minze:render', { amount: 10 })
   * ```
   */
  cast(eventName: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(eventName, { detail }))
  }

  /**
   * Adds or removes a provided event listener.
   *
   * @example
   * ```
   * this.registerEvent(this.eventListeners[0], 'add')
   * ```
   */
  private registerEvent(eventTuple: MinzeEvent, action: MinzeRegisterAction) {
    const [eventTarget, eventName, callback] = eventTuple

    let elements:
      | NodeList
      | MinzeElement[]
      | typeof document[]
      | typeof window[]
      | undefined

    if (eventTarget === document) {
      elements = [document]
    } else if (eventTarget === window) {
      elements = [window]
    } else if (eventTarget instanceof MinzeElement) {
      elements = [this]
    } else if (typeof eventTarget === 'string') {
      elements = this.shadowRoot?.querySelectorAll(eventTarget)
    }

    elements?.forEach((element) => {
      action === 'add'
        ? element.addEventListener(eventName, callback, true)
        : element.removeEventListener(eventName, callback, true)
    })
  }

  /**
   * Adds or removes all event listeners provided.
   *
   * @example
   * ```
   * this.registerEvents(this.eventListeners, 'add')
   * ```
   */
  private registerEvents(
    eventListeners: MinzeEvent[],
    action: MinzeRegisterAction
  ) {
    if (eventListeners?.length) {
      eventListeners.forEach((eventTuple) => {
        this.registerEvent(eventTuple, action)
      })
    }
  }

  /**
   * Adds or removes all event listeners from eventListenersFactory and eventListeners properties.
   *
   * @example
   * ```
   * this.registerAllEvents('add')
   * ```
   */
  private registerAllEvents(action: MinzeRegisterAction) {
    this.registerEvents(
      [...this.eventListenersFactory, ...(this.eventListeners || [])],
      action
    )
  }
}
