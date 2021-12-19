import { camelToDash, dashToCamel } from './utils'

export type MinzeProp = [name: string, value: unknown, exposeAttr?: boolean]
export type MinzeAttr = [name: string, value?: unknown]

export type MinzeEvent = [
  eventTarget: string | MinzeElement | typeof window | typeof document,
  eventName: string,
  callback: (event: Event) => void
]

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
   * Stores all provided properties for reactive getter / setter reference.
   */
  private reactiveStash: {
    props: { [key: string]: unknown }
    attrs: { [key: string]: unknown }
  } = {
    props: {},
    attrs: {}
  }

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
   * Creates a desriptor with a getter/setter stash-value binding for a given property
   * and requests a rerender on each value change.
   */
  private makeReactiveDescriptor(
    stashValue: unknown,
    camelName?: string,
    exposeAttr?: boolean
  ) {
    return {
      get: () => stashValue,
      set: (value: unknown) => {
        if (stashValue !== value) {
          stashValue = value

          // mirror property changes to attribute
          if (exposeAttr && camelName) {
            const dashName = camelToDash(camelName)
            this.setAttribute(dashName, JSON.stringify(value))
          }

          this.render()
        }
      }
    }
  }

  /**
   * Makes all possible properties deeply reactive.
   */
  private makeReactive(
    target: MinzeElement | Record<string, unknown>,
    stash: Record<string, unknown>,
    camelName: string,
    exposeAttr?: boolean
  ) {
    const stashValue = stash[camelName]
    const dashName = camelToDash(camelName)

    const descriptor = this.makeReactiveDescriptor(
      stashValue,
      camelName,
      exposeAttr
    )
    Object.defineProperty(target, camelName, descriptor)

    // expose property to attribute
    exposeAttr && this.setAttribute(dashName, JSON.stringify(stashValue))

    if (
      stashValue &&
      typeof stashValue === 'object' &&
      !Array.isArray(stashValue)
    ) {
      Object.keys(stashValue).forEach((camelName) => {
        this.makeReactive(
          stashValue as Record<string, unknown>,
          stashValue as Record<string, unknown>,
          camelName
        )
      })
    }
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
    const [name, value, exposeAttr] = prop
    const camelName = name

    if (!(camelName in this)) {
      // initialize stash for property
      const propStash = this.reactiveStash.props
      propStash[camelName] = value

      // make property reactive
      this.makeReactive(this, propStash, camelName, exposeAttr)
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
    const dashName = name

    if (!(camelName in this)) {
      const attrStash = this.reactiveStash.attrs

      // set an attribute on element if no attribute exists and a fallback value is provided
      if (value) {
        this.getAttribute(dashName) ??
          this.setAttribute(dashName, String(value))
      }

      // set stash property
      attrStash[camelName] = value

      // make property reactive
      Object.defineProperty(this, camelName, {
        get: () => this.getAttribute(dashName),
        set: (value) => {
          if (attrStash[camelName] !== value) {
            attrStash[camelName] = value

            // request render
            this.render()
          }
        }
      })
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

    const camelName = dashToCamel(name)
    if (camelName in this && newValue !== oldValue) {
      this[camelName] = newValue
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
