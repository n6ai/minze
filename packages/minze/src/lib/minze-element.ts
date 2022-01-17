import { deepPatch } from './patcher'
import { isProxy, camelToDash, dashToCamel, warn } from './utils'

export type MinzeProp =
  | string
  | [name: string, value: unknown, exposeAttr?: boolean]

export type MinzeAttr = string | [name: string, value?: unknown]

export type MinzeWatcher = [
  name: string,
  callback: (
    newValue?: unknown,
    oldValue?: unknown,
    key?: string,
    target?: object | typeof MinzeElement
  ) => Promise<void> | void
]

export type MinzeEvent = [
  eventTarget: string | MinzeElement | typeof window,
  eventName: string,
  callback: (event: Event) => void
]

export type Reactive = ReadonlyArray<MinzeProp>
export type Attrs = ReadonlyArray<MinzeAttr>
export type Watch = ReadonlyArray<MinzeWatcher>
export type EventListeners = ReadonlyArray<MinzeEvent>

// aliases
export type MinzeReactive = Reactive
export type MinzeAttrs = Attrs
export type MinzeWatch = Watch
export type MinzeEventListeners = EventListeners

/**
 * MinzeElement: Can be used to extend from to create custom web components.
 *
 * @example
 * ```
 * class MyElement extends MinzeElement {
 *   html = () => `<div>Hello Minze!</div>`
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
   * The current Minze version.
   */
  readonly version = '__VERSION__'

  /**
   * Registers element as a custom web component.
   *
   * @example
   * ```
   * class MyElement exptends MinzeElement {}
   * MyElement.define()
   * ```
   */
  static define(name?: string) {
    if (!name) name = camelToDash(this.name as string)
    if (customElements) customElements.define(name, this)
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
   * Defines properties that should be created as reactive.
   *
   * reactive takes a mixed array of strings and tuples:
   * [name, [ name, value, exposeAttr? ], ...]
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   reactive = [
   *     'foo',
   *     ['active', false],
   *     ['amount', 0, true]
   *   ]
   * }
   * ```
   */
  reactive?: Reactive

  /**
   * Defines attribute properties that should be created as reactive.
   *
   * attrs takes a mixed array of strings and tuples:
   * [name [ name, value? ], ...]
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   attrs = [
   *     'foo',
   *     ['active'],
   *     ['amount', 0]
   *   ]
   * }
   * ```
   */
  attrs?: Attrs

  /**
   * Defines attributes which should be observed.
   *
   * observedAttributes takes an array strings.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   static observedAttributes = ['active', 'amount']
   * }
   * ```
   */
  static observedAttributes?: string[]

  /**
   * Defines watchers with callbacks for reactive properties and attrs.
   * Whenever a property changes the watcher will be called.
   *
   * watch takes an array of tuples: [[ name, callback ], ...]
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   watch = [
   *     ['active', (newValue, oldValue) => {}],
   *     ['amount', async (newValue, oldValue) => {}]
   *   ]
   * }
   * ```
   */
  watch?: Watch

  /**
   * Defines event listeners that will be registered when the element is rendered.
   *
   * eventListeners takes an array of tuples: [[ eventTarget, eventName, callback ], ...]
   *
   * possible event targets are:
   * - global: window (limited to prevent event-listener-pollution)
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
  eventListeners?: EventListeners

  /**
   * Defines the shadow DOM HTML content.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   html = () => `
   *     <div>Hello Minze!</div>
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
      <style>
        :host { box-sizing: border-box; display: block; }
        :host([hidden]) { display: none }
        ${this.css?.() ?? ''}
      </style>
      ${this.html?.() ?? '<slot></slot>'}
    `
  }

  /**
   * Stores the previously rendered template.
   */
  private cachedTemplate: string | null = null

  /**
   * Renders the template into the shadow DOM.
   * Removes any previously registered event listeners.
   * Attaches all new event listeners.
   *
   * @param force - Forces the re-rendering of the template regardless of caching.
   *
   * @example
   * ```
   * this.render()
   * ```
   */
  private async render(force?: boolean) {
    if (this.shadowRoot) {
      const template = this.template()

      if (template !== this.cachedTemplate || force) {
        const previousCachedTemplate = this.cachedTemplate
        this.cachedTemplate = template // cache early

        await this.beforeRender?.()

        this.eventListeners?.forEach(async (eventTuple) =>
          this.registerEvent(eventTuple, 'remove')
        )

        if (!previousCachedTemplate || force) {
          this.shadowRoot.innerHTML = template
        } else {
          // patches only the difference between the new template and the current shadow dom
          deepPatch(template, this.shadowRoot)
        }

        this.eventListeners?.forEach(async (eventTuple) =>
          this.registerEvent(eventTuple, 'add')
        )

        this.onRender?.()
      }
    }
  }

  /**
   * Re-renders the component template.
   *
   * @param force - Forces the re-rendering of the template regardless of caching.
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
   * Selects the first matching element inside the shadow DOM.
   *
   * @example
   * ```
   * this.select('div')
   * ```
   */
  select<E extends Element = Element>(selectors: string) {
    const root = this.shadowRoot
    return root?.querySelector<E>(selectors) ?? null
  }

  /**
   * Selects element(s) inside the shadow DOM.
   *
   * @example
   * ```
   * this.selectAll('div')
   * ```
   */
  selectAll<E extends Element = Element>(selectors: string) {
    const root = this.shadowRoot
    return root?.querySelectorAll<E>(selectors) ?? null
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
    this.setAttribute(
      dashName,
      typeof value === 'object' ? JSON.stringify(value) : String(value)
    )
  }

  /**
   * Callback, executes a set of methods on reactive changes.
   *
   * @example
   * ```
   * this.reactiveChange(type, rootName, rootProp, target, prop, newValue, oldValue)
   * ```
   */
  private async reactiveChange<T = object>(
    type: 'complex' | 'primitive' | 'attr',
    rootName: string,
    rootProp: T,
    target: object | typeof MinzeElement,
    key: string,
    newValue: unknown,
    oldValue: unknown
  ) {
    const camelName = rootName
    const dashName = camelToDash(rootName)

    this.watch?.forEach(async ([watcherName, callback]) => {
      if (
        watcherName === camelName ||
        (type === 'attr' && watcherName === dashName)
      ) {
        callback(newValue, oldValue, key, target)
      }
    })

    this.render()
  }

  /**
   * Makes a complex object deeply reactive.
   *
   * @example
   * ```
   * this.makeComplexReactive('active', {deeply: {nested: true}}, true)
   * ```
   */
  private makeComplexReactive(
    name: string,
    prop: Record<string, unknown>,
    exposeAttr?: boolean
  ) {
    const rootName = name
    const rootProp = prop

    // expose attribute
    if (exposeAttr) this.exposeAttr(rootName, rootProp)

    // create trap function
    const createTrap = () => {
      return {
        get: (target: object, prop: symbol) => {
          if (prop === isProxy) return true
          let value = Reflect.get(target, prop)

          // create proxy on demand and assign it
          if (typeof value === 'object' && !value[isProxy]) {
            value = createProxy(value)
            Reflect.set(target, prop, value)
          }

          return value
        },
        set: (target: object, prop: string, newValue: unknown) => {
          const oldValue = Reflect.get(target, prop)

          if (oldValue !== newValue) {
            Reflect.set(target, prop, newValue)

            // expose attribute
            if (exposeAttr) this.exposeAttr(rootName, rootProp)

            this.reactiveChange(
              'complex',
              rootName,
              rootProp,
              target,
              prop,
              newValue,
              oldValue
            )
          }

          return true
        }
      }
    }

    // create a proxy function
    const createProxy = (target: Record<string, unknown>) => {
      return new Proxy(target, createTrap())
    }

    // assign the root property
    this[rootName] = createProxy(rootProp)
  }

  /**
   * Makes a primitive value reactive.
   *
   * @example
   * ```
   * this.makePrimitiveReactive('count', 99)
   * ```
   */
  private makePrimitiveReactive(
    name: string,
    prop: unknown,
    exposeAttr?: boolean
  ) {
    const rootName = name
    const stashPrefix = '$minze_stash_prop_'
    const stashName = `${stashPrefix}${name}`
    this[stashName] = prop

    // expose attribute
    exposeAttr && this.exposeAttr(name, prop)

    Object.defineProperty(this, name, {
      get: () => this[stashName],
      set: (newValue) => {
        const oldValue = this[stashName]

        if (oldValue !== newValue) {
          this[stashName] = newValue

          // expose attribute
          exposeAttr && this.exposeAttr(name, newValue)

          this.reactiveChange<unknown>(
            'primitive',
            rootName,
            this[stashName],
            this,
            rootName,
            newValue,
            oldValue
          )
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
    const name = typeof prop === 'string' ? prop : prop[0]
    const value = typeof prop === 'string' ? null : prop[1]
    const exposeAttr = typeof prop === 'string' ? undefined : prop[2]
    const camelName = name

    // stop right here if a property with the same name already exists
    if (camelName in this) {
      warn(
        `A property with the name "${camelName}" already exists in this component.`
      )
      return
    }

    // run a different method based on the type of the provided value
    if (value && typeof value === 'object') {
      this.makeComplexReactive(
        camelName,
        value as Record<string, unknown>,
        exposeAttr
      )
    } else {
      this.makePrimitiveReactive(camelName, value, exposeAttr)
    }
  }

  /**
   * Makes provided property reactive to attribute changes on the component.
   *
   * @example
   * ```
   * this.registerAttr(attr)
   * ```
   */
  private registerAttr(attr: MinzeAttr) {
    const name = typeof attr === 'string' ? attr : attr[0]
    const value = typeof attr === 'string' ? null : attr[1]
    const camelName = dashToCamel(name)
    const dashName = name
    const rootName = camelName
    const rootProp =
      typeof value === 'object' ? JSON.stringify(value) : String(value)

    // stop right here if a property with the same name already exists
    if (camelName in this) {
      warn(`A property with the name "${camelName}" already exists.`)
      return
    }

    const stashPrefix = '$minze_stash_attr_'
    const stashName = `${stashPrefix}${camelName}`
    this[stashName] = rootProp

    // set an attribute on the element if no attribute exists
    // and a fallback value is provided
    if (
      Array.isArray(attr) &&
      attr.length === 2 &&
      !this.getAttribute(dashName)
    ) {
      this.setAttribute(dashName, rootProp)
    }

    // make property reactive
    Object.defineProperty(this, camelName, {
      get: () => {
        const value = this.getAttribute(dashName)

        // convert undefined, null and booleans
        if (value == 'undefined') return undefined
        else if (value == 'null') return null
        else if (value?.match(/^(true|false)$/)) return JSON.parse(value)
        else return value
      },
      set: (newValue) => {
        const oldValue = this[stashName]

        if (oldValue !== newValue) {
          this[stashName] = newValue

          this.reactiveChange<undefined | null | boolean | string>(
            'attr',
            rootName,
            this[stashName] as undefined | null | boolean | string,
            this,
            rootName,
            newValue,
            oldValue
          )
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

    let elements: NodeList | MinzeElement[] | typeof window[] | undefined

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
   * It's a good idea to namespace the event name. For example: `minze:update`
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
    this.onStart?.()

    this.reactive?.forEach(async (prop) => this.registerProp(prop))
    this.attrs?.forEach(async (attr) => this.registerAttr(attr))

    this.onReactive?.()

    await this.render()

    // sets rendered attribute on the component
    this.options?.exposeAttrs?.rendered && this.setAttribute('rendered', '')

    this.onReady?.()
  }

  /**
   * Lifecycle (Internal) - Runs each time the element is disconnected from the document's DOM.
   */
  private async disconnectedCallback() {
    this.eventListeners?.forEach(async (eventTuple) =>
      this.registerEvent(eventTuple, 'remove')
    )

    this.onDestroy?.()
  }

  /**
   * Lifecycle (Internal) - Runs each time the element is moved to a new document.
   */
  private async adoptedCallback() {
    this.eventListeners?.forEach(async (eventTuple) =>
      this.registerEvent(eventTuple, 'remove')
    )

    this.onMove?.()
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

    this.onAttributeChange?.(name, oldValue, newValue)
  }

  /**
   * Lifecycle - Runs once at the start of the connectedCallback method.
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
   * Lifecycle - Runs once after reactive properties are initialized.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   onReactive = () => console.log('onReactive')
   * }
   * ```
   */
  onReactive?(): Promise<void> | void

  /**
   * Lifecycle - Runs once at the end of the connectedCallback method.
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
   * Lifecycle - Runs once at the end of the disconnectedCallback method.
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
   * Lifecycle - Runs once at the start of the adoptedCallback method.
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
   * Lifecycle - Runs each time at before of every render.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   onRender = () => console.log('onRender')
   * }
   * ```
   */
  beforeRender?(): Promise<void> | void

  /**
   * Lifecycle - Runs each time at the end of every render.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   onRender = () => console.log('onRender')
   * }
   * ```
   */
  onRender?(): Promise<void> | void

  /**
   * Lifecycle - Runs each time at the start of the attributeChangedCallback method.
   *
   * This hook runs before the onStart lifecycle, if an attribute is set on the element:
   * `<minze-element text="Hello Minze!" /></minze-element>`
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
   * Lifecycle - Runs each time at the end of the attributeChangedCallback method.
   *
   * This hook runs before the onStart lifecycle, if an attribute is set on the element:
   * `<minze-element text="Hello Minze!" /></minze-element>`
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
