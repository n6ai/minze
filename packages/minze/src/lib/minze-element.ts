import { camelToDash, dashToCamel } from './utils'

export type MinzeProp = [name: string, value: unknown, exposeAttr?: boolean]
export type MinzeAttr = [name: string, value?: unknown]

export type MinzeEvent = [
  eventTarget: string | MinzeElement | typeof window,
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
   * Selects a single element inside the shadow DOM.
   *
   * @example
   * ```
   * this.select('div')
   * ```
   */
  select(selector: string) {
    const root = this.shadowRoot
    return root?.querySelector(selector)
  }

  /**
   * Selects element(s) inside the shadow DOM.
   *
   * @example
   * ```
   * this.selectAll('div')
   * ```
   */
  selectAll(selector: string) {
    const root = this.shadowRoot
    return root?.querySelectorAll(selector)
  }

  /**
   * Exposes property as an attribute on the element.
   *
   * @example
   * ```
   * this.exposeAttr('active', false)
   * ```
   */
  private exposeAttr(name: string, value: unknown) {
    const dashName = camelToDash(name)
    this.setAttribute(dashName, JSON.stringify(value))
  }

  /**
   * Makes a complex object deeply reactive.
   *
   * @example
   * ```
   * this.makeComplexReactive(this, 'active', {deeply: {nested: true}})
   * ```
   */
  private makeComplexReactive(
    target: MinzeElement | Record<string, unknown>,
    name: string,
    prop: Record<string, unknown>,
    exposeAttr?: boolean
  ) {
    if (prop && typeof prop === 'object') {
      // expose attribute
      exposeAttr && this.exposeAttr(name, prop)

      // create a proxy
      const proxy = new Proxy(prop, {
        get: (target, prop, receiver) => Reflect.get(target, prop, receiver),
        set: (target, prop, newValue) => {
          if (Reflect.get(target, prop) !== newValue) {
            Reflect.set(target, prop, newValue)

            // expose attribute
            exposeAttr && this.exposeAttr(name, newValue)

            // request render
            this.render()
          }
          return true
        }
      })

      // assign the proxy
      target[name] = proxy

      // check if the property has keys
      if (Object.keys(prop)) {
        // recursively call this method on each key
        for (const key in prop) {
          typeof prop[key] === 'object' &&
            this.makeComplexReactive(
              target[name] as Record<string, unknown>,
              key,
              prop[key] as Record<string, unknown>
            )
        }
      }
    }
  }

  /**
   * Makes a primitive value reactive.
   *
   * @example
   * ```
   * this.makePrimitiveReactive(this, 'count', 99)
   * ```
   */
  private makePrimitiveReactive(
    target: MinzeElement,
    name: string,
    prop: unknown,
    exposeAttr?: boolean
  ) {
    const stashPrefix = '$minze_stash_prop_'
    const stashName = `${stashPrefix}${name}`
    target[stashName] = prop

    // expose attribute
    exposeAttr && this.exposeAttr(name, prop)

    Object.defineProperty(target, name, {
      get: () => target[stashName],
      set: (newValue) => {
        if (target[stashName] !== newValue) {
          target[stashName] = newValue

          // expose attribute
          exposeAttr && this.exposeAttr(name, newValue)

          // request render
          this.render()
        }
      }
    })
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

    // stop right here if a property with the same name already exists
    if (camelName in this) return

    // run a different method based on the type of the provided value
    if (value && typeof value === 'object') {
      this.makeComplexReactive(
        this,
        camelName,
        value as Record<string, unknown>,
        exposeAttr
      )
    } else {
      this.makePrimitiveReactive(this, camelName, value, exposeAttr)
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

    // stop right here if a property with the same name already exists
    if (camelName in this) return

    const dashName = name
    const stashPrefix = '$minze_stash_attr_'
    const stashName = `${stashPrefix}${camelName}`
    this[stashName] = value

    // set an attribute on the element if no attribute exists
    // and a fallback value is provided
    if (value) {
      this.getAttribute(dashName) ?? this.setAttribute(dashName, String(value))
    }

    // set stash property
    this[stashName] = value

    // make property reactive
    Object.defineProperty(this, camelName, {
      get: () => this.getAttribute(dashName),
      set: (newValue) => {
        if (this[stashName] !== newValue) {
          this[stashName] = newValue

          // request render
          this.render()
        }
      }
    })
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

    if (eventTarget === window) {
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
    this.eventListeners?.forEach((eventTuple) =>
      this.registerEvent(eventTuple, 'remove')
    )

    await this.onDestroy?.()
  }

  /**
   * Lifecycle (Internal) - Runs each time the element is moved to a new document.
   */
  private async adoptedCallback() {
    await this.onMove?.()

    this.render()
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

    await this.onAttributeChange?.(name, oldValue, newValue)
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
   * Lifecycle - Runs at the end of the disconnectedCallback method.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   onDestroy = () => console.log('onDestroy')
   * }
   * ```
   */
  onDestroy?(): Promise<void> | void

  /**
   * Lifecycle - Runs at the start of the adoptedCallback method.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   onMove = () => console.log('onMove')
   * }
   * ```
   */
  onMove?(): Promise<void> | void

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
   *   onAttributeChange = (name, oldValue, newValue) => console.log('onAttributeChange')
   * }
   * ```
   */
  onAttributeChange?(
    name?: string,
    oldValue?: string,
    newValue?: string
  ): Promise<void> | void
}
