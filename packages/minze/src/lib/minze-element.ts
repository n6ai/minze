import { camelToDash, dashToCamel } from './utils'

/**
 * Types
 */
type MinzeProp = [name: string, property: unknown, attr?: boolean]
type MinzeAttr = [name: string, property?: unknown]

type MinzeEvent = [
  eventTarget: string | MinzeElement | typeof window | typeof document,
  eventName: string,
  callback: (event: Event) => void
]

type MinzeProxyProp = { value: unknown }

export type MinzeProps = ReadonlyArray<MinzeProp>
export type MinzeAttrs = ReadonlyArray<MinzeAttr>
export type MinzeEvents = ReadonlyArray<MinzeEvent>

/**
 * MinzeElement: Can be extended from to create web components.
 *
 * @example
 * ```
 * class MyElement extends MinzeElement {
 *   html = () => `<div>Hello World</div>`
 * }
 * ```
 */
export class MinzeElement extends HTMLElement {
  [key: string]: unknown

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  /**
   * Defines options for the web component.
   *
   * @example
   * ```
   * MyElement extends MinzeElement {
   *   options = {
   *     exposeAttrs: {
   *       rendered: true
   *     }
   *   }
   * }
   * ```
   */
  options?: {
    exposeAttrs?: {
      rendered?: boolean
    }
  }

  /**
   * Defines properties whitch should be created as reactive.
   *
   * reactive takes an array of tuples: [[ name, value, attrs? ], ...]
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   reactive = [
   *     ['active', false],
   *     ['amount', 0, true]
   *   ]
   * }
   * ```
   */
  reactive?: MinzeProps

  /**
   * Defines properties whitch should be created as reactive.
   * Thay listen for attribute changes.
   *
   * attrs takes an array of tuples: [[ name, value? ], ...]
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   attrs = [
   *     ['active'],
   *     ['amount', 0]
   *   ]
   * }
   * ```
   */
  attrs?: MinzeAttrs

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
  eventListeners?: MinzeEvents

  /**
   * Defines the shadow DOM HTML content.
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
   * Creates the template for the shadow root, which will be inserted into the Shadow root.
   */
  private template() {
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
   * Renders the template into the shadow DOM.
   * Removes any previously registered event listeners
   * Attaches all new event listeners.
   *
   * @param force - Forces the rerendering of the template regardless of caching.
   *
   * @example
   * ```
   * this.render()
   * ```
   */
  private render(force?: boolean) {
    if (this.shadowRoot) {
      const template = this.template()

      if (template !== this.cachedTemplate || force) {
        this.eventListeners?.forEach((eventTuple) =>
          this.registerEvent(eventTuple, 'remove')
        )

        this.shadowRoot.innerHTML = template
        this.cachedTemplate = template

        this.eventListeners?.forEach((eventTuple) =>
          this.registerEvent(eventTuple, 'add')
        )
      }
    }
  }

  /**
   * Rerenders the component template.
   *
   * @param force - Forces the rerendering of the template regardless of caching.
   *
   * @example
   * ```
   * this.rerender()
   * ```
   */
  rerender(force?: boolean) {
    this.render(force)
  }

  /**
   * Makes provided property reactive.
   *
   * @example
   * ```
   * this.registerProp(prop)
   * ```
   */
  private registerProp(prop: MinzeProp) {
    const [name, value, attr] = prop
    const dashName = camelToDash(name)

    if (!(name in this)) {
      // mirror property changes to attribute
      attr && this.setAttribute(dashName, String(value))

      const proxy = new Proxy(
        { value },
        {
          get: (target) => target.value,
          set: (target, prop, value) => {
            if (value !== target.value) {
              target.value = value
              attr && this.setAttribute(dashName, String(value))

              this.render()
            }

            return true
          }
        }
      )

      Object.defineProperty(this, name, { writable: true, value: proxy })
    }
  }

  /**
   * Makes provided property reactive to attribute changes on component.
   *
   * @example
   * ```
   * this.registerAttr(attr)
   * ```
   */
  private registerAttr(attr: MinzeAttr) {
    const [name, value] = attr
    const camelName = dashToCamel(name)

    if (!(camelName in this)) {
      // set an attribute if no attribute exists, and an attribute is provided
      if (value) {
        this.getAttribute(name) ?? this.setAttribute(name, String(value))
      }

      const proxy = new Proxy(
        { value },
        {
          get: () => this.getAttribute(name) ?? undefined,
          set: (target, prop, value) => {
            if (value !== target.value) {
              this.setAttribute(name, value)
              this.render()
            }

            return true
          }
        }
      )

      Object.defineProperty(this, camelName, { writable: true, value: proxy })
    }
  }

  /**
   * Adds or removes a provided event listener.
   *
   * @example
   * ```
   * this.registerEvent(this.eventListeners[0], 'add')
   * ```
   */
  private registerEvent(eventTuple: MinzeEvent, action: 'add' | 'remove') {
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
   * Dispatches a custom event from the web component.
   *
   * Is's a good idea to namespace the event name. For example: `minze:update`
   *
   * @example
   * ```
   * this.cast('minze:update', { amount: 10 })
   * ```
   */
  cast(eventName: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(eventName, { detail }))
  }

  /**
   * Lifecycle (Internal) - Runs whenever the element is appended into a document-connected element.
   */
  private async connectedCallback() {
    await this.onStart?.()

    this.reactive?.forEach((prop) => this.registerProp(prop))
    this.attrs?.forEach((attr) => this.registerAttr(attr))
    this.render()

    // sets rendered attribute on the component
    this.options?.exposeAttrs?.rendered && this.setAttribute('rendered', '')

    await this.onReady?.()
  }

  /**
   * Lifecycle (Internal) - Runs each time the element is disconnected from the document's DOM.
   */
  private async disconnectedCallback() {
    await this.beforeDestroy?.()

    this.eventListeners?.forEach((eventTuple) =>
      this.registerEvent(eventTuple, 'remove')
    )

    await this.afterDestroy?.()
  }

  /**
   * Lifecycle (Internal) - Runs each time the element is moved to a new document.
   */
  private async adoptedCallback() {
    await this.beforeMove?.()

    this.render()

    await this.afterMove?.()
  }

  /**
   * Lifecycle (Internal) - Runs whenever one of the element's attributes is changed.
   */
  private async attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    await this.beforeAttributeChange?.(name, oldValue, newValue)

    if (name in this && newValue !== oldValue) {
      (this[name] as MinzeProxyProp).value = newValue
    }

    await this.afterAttributeChange?.(name, oldValue, newValue)
  }

  /**
   * Lifecycle - Runs at the start of the connectedCallback method.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   onStart = () => console.log('onStart')
   * }
   * ```
   */
  onStart?(): Promise<void> | void

  /**
   * Lifecycle - Runs at the end of the connectedCallback method.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   onReady = () => console.log('onReady')
   * }
   * ```
   */
  onReady?(): Promise<void> | void

  /**
   * Lifecycle - Runs at the start of the disconnectedCallback method.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   beforeDestroy = () => console.log('beforeDestroy')
   * }
   * ```
   */
  beforeDestroy?(): Promise<void> | void

  /**
   * Lifecycle - Runs at the end of the disconnectedCallback method.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   afterDestroy = () => console.log('afterDestroy')
   * }
   * ```
   */
  afterDestroy?(): Promise<void> | void

  /**
   * Lifecycle - Runs at the start of the adoptedCallback method.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   beforeMove = () => console.log('beforeMove')
   * }
   * ```
   */
  beforeMove?(): Promise<void> | void

  /**
   * Lifecycle - Runs at the end of the adoptedCallback method.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   afterMove = () => console.log('afterMove')
   * }
   * ```
   */
  afterMove?(): Promise<void> | void

  /**
   * Lifecycle - Runs at the start of the attributeChangedCallback method.
   *
   * This hook runs before the onStart lifecycle if an attribute is set on the element:
   * `<minze-element text="Hello world" /></minze-element>`
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   beforeAttributeChange = (name, oldValue, newValue) => console.log('beforeAttributeChange')
   * }
   * ```
   */
  beforeAttributeChange?(
    name?: string,
    oldValue?: string,
    newValue?: string
  ): Promise<void> | void

  /**
   * Lifecycle - Runs at the end of the attributeChangedCallback method.
   *
   * This hook runs before the onStart lifecycle if an attribute is set on the element:
   * `<minze-element text="Hello world" /></minze-element>`
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   afterAttributeChange = (name, oldValue, newValue) => console.log('afterAttributeChange')
   * }
   * ```
   */
  afterAttributeChange?(
    name?: string,
    oldValue?: string,
    newValue?: string
  ): Promise<void> | void
}
