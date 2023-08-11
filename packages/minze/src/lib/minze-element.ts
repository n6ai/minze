import { deepPatch } from './patcher'
import {
  isProxy,
  camelToDash,
  dashToCamel,
  createObserver,
  warn
} from './utils'

export type MinzeProp =
  | string
  | [name: string, value: unknown, exposeAttr?: boolean]

export type MinzeAttr = string | [name: string, value?: unknown]

export type MinzeWatcher = [
  name: string,
  callback: (
    newValue?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    oldValue?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
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
export type EventListeners = Array<MinzeEvent>

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
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  /**
   * The current Minze version.
   */
  static readonly version = '__VERSION__'

  /**
   * Can by used in conditional checks to determine if the class is a MinzeElement.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {}
   * MyElement.isMinzeElement
   * ```
   */
  static readonly isMinzeElement = true

  /**
   * The class name of the component in dash-case.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {}
   * MyElement.dashName
   * ```
   */
  static get dashName() {
    return camelToDash(this.name)
  }

  /**
   * The class name of the component instance in dash-case.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   onStart() {
   *     console.log(this.dashName) // my-element
   *   }
   * }
   * ```
   */
  get dashName() {
    return camelToDash(this.constructor.name)
  }

  /**
   * The class name of the component instance.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   onStart() {
   *     console.log(this.name) // MyElement
   *   }
   * }
   * ```
   */
  get name() {
    return this.constructor.name
  }

  /**
   * Registers element as a custom web component.
   *
   * @param name - The name of the custom web component.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {}
   * MyElement.define()
   * // or
   * MyElement.define('my-element')
   * ```
   */
  static define(name?: string) {
    name ??= camelToDash(this.name)
    if (customElements)
      customElements.get(name) ?? customElements.define(name, this)
  }

  /**
   * Defines options for the web component.
   *
   * @default
   * ```
   * MyElement extends MinzeElement {
   *   options = {
   *     cssReset: true,
   *     exposeAttrs: {
   *       exportparts: false
   *       rendered: false
   *     }
   *   }
   * }
   * ```
   */
  options?: {
    cssReset?: boolean
    exposeAttrs?: {
      exportparts?: boolean
      rendered?: boolean
    }
  }

  /**
   * Toggles debug mode.
   *
   * @example
   * ```
   * MyElement extends MinzeElement {
   *   debug = true
   * }
   * ```
   */
  debug?: boolean

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
   * Defines which attributes should be observed.
   * A change to an observed attribute requests a template update.
   *
   * observedAttributes takes an array of strings.
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
   *     ['active', (newValue, oldValue, key, target) => {}],
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
    const cssReset =
      this.options?.cssReset || this.options?.cssReset === undefined

    // prettier-ignore
    return `
      <style>
        @layer reset, default; @layer reset {
        :host { box-sizing: border-box; display: block; }
        :host([hidden]) { display: none; }
        :where(*, ::before, ::after, :host::before, :host::after):not([no-css-reset]) { box-sizing: border-box; ${cssReset ? 'color: inherit; text-decoration: inherit; font-size: inherit; line-height: inherit; font-weight: inherit; font-family: inherit; text-indent: 0; background-color: transparent; border: 0 solid transparent; padding: 0; margin: 0;' : '' }}
        ${cssReset ? `
        :where(table):not([no-css-reset]) { border-color: inherit; border-collapse: collapse; }
        :where(img, svg, video, canvas, audio, iframe, embed, object):not([no-css-reset]) { display: block; max-width: 100%; height: auto; }
        :where(button, [role="button"]):not([no-css-reset]) { font-size: 100%; text-transform: none; cursor: pointer; }
        ` : '' }}
        ${`@layer default {${this.css?.()}}` ?? ''}
      </style>
      ${this.html?.() ?? '<slot></slot>'}
    `
  }

  /**
   * Stores the previously rendered template.
   */
  private _cachedTemplate?: string | null

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

      if (template !== this._cachedTemplate || force) {
        const previousCachedTemplate = this._cachedTemplate
        this._cachedTemplate = template // cache early

        await this.beforeRender?.()

        this.eventListeners?.forEach(async (eventTuple) =>
          this.registerEvent(eventTuple, 'remove')
        )

        if (!previousCachedTemplate || force) {
          this.shadowRoot.innerHTML = template
        } else {
          // patches only the difference between the new template and the current shadow dom
          deepPatch(template, previousCachedTemplate, this.shadowRoot)
        }

        if (this.html) this.mergeEvents(this.html)

        this.eventListeners?.forEach(async (eventTuple) =>
          this.registerEvent(eventTuple, 'add')
        )

        this.onRender?.()
      }
    }
  }

  /**
   * Re-renders the component template, invalidating all caches.
   *
   * @example
   * ```
   * this.rerender()
   * ```
   */
  rerender() {
    this.render(true)
  }

  /**
   * Selects the first matching element inside the shadow DOM.
   *
   * @param selectors - A valid CSS selector string.
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
   * @param selectors - A valid CSS selector string.
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
   * Returns an array of slotted element(s) for provided slot name, otherwise `null` if none found.
   * Works only after the template has rendered, otherwise returns `null`.
   * Can be used inside the `onRender` or `onReady` hooks.
   *
   * @param name - The name of the slot or empty / `default` for the default slot.
   *
   * @example
   * ```
   * this.slotted('default')
   * ```
   */
  slotted(name?: string) {
    const slots = this.selectAll<HTMLSlotElement>('slot')

    if (slots) {
      const slotName = name === 'default' || name === undefined ? '' : name
      const slot = Array.from(slots).filter((el) => el.name === slotName)
      return slot?.[0]?.assignedElements() ?? null
    }

    return null
  }

  /**
   * Exposes property as an attribute on the element.
   *
   * @param name - The name of the attribute.
   * @param value - The value for the attribute.
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
   * @param type - The type of property that changed.
   * @param rootName - The name of the root property that changed.
   * @param target - The target of the property that changed.
   * @param key - The name of the property that changed.
   * @param newValue - The new value of the property that changed.
   * @param oldValue - The old value of the property that changed.
   *
   * @example
   * ```
   * this.reactiveChange(type, rootName, target, prop, newValue, oldValue)
   * ```
   */
  private async reactiveChange(
    type: 'complex' | 'primitive' | 'attr',
    rootName: string,
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
   * @param name - The name of the property.
   * @param prop - The property to be made reactive.
   * @param exposeAttr - Whether to expose the property as an attribute.
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
   * @param name - The name of the property.
   * @param prop - The property to be made reactive.
   * @param exposeAttr - Whether to expose the property as an attribute.
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
    const stashName = `_$reactive-${name}`
    this[stashName] = prop

    // expose attribute
    if (exposeAttr) this.exposeAttr(name, prop)

    Object.defineProperty(this, name, {
      get: () => this[stashName],
      set: (newValue) => {
        const oldValue = this[stashName]

        if (oldValue !== newValue) {
          this[stashName] = newValue

          // expose attribute
          if (exposeAttr) this.exposeAttr(name, newValue)

          this.reactiveChange(
            'primitive',
            rootName,
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
   * @param prop - The MinzeProp to be made reactive.
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
   * @param attr - The MinzeAttr to be made reactive.
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

    const stashName = `_$attr-${camelName}`
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

        // try to auto-convert the attribute value to the proper type,
        // otherwise return the value as a string
        if (value === 'undefined' || value === undefined) {
          return undefined
        } else if (value === 'null' || value === null) {
          return null
        } else if (value === '') {
          return true // return set attributes without values as true
        } else if (value.match(/^(true|false)$/)) {
          return JSON.parse(value)
        } else if (value.match(/^[-+]?\d+$/)) {
          return parseInt(value)
        } else if (value.match(/^[+-]?\d*\.\d+$/)) {
          return parseFloat(value)
        } else {
          try {
            return JSON.parse(value)
          } catch {
            return value
          }
        }
      },
      set: (newValue) => {
        const oldValue = this[stashName]

        if (oldValue !== newValue) {
          this[stashName] = newValue

          this.reactiveChange(
            'attr',
            rootName,
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
   * Merges any at-events from the provided template with the eventListeners array.
   *
   * @param template - A template function or string with html markup.
   *
   * @example
   * ```
   * this.mergeEvents(this.html)
   * ```
   */
  private mergeEvents(template: (() => string) | string) {
    template = typeof template === 'function' ? template() : template

    type atEvent = [attribute: string, event: string, callback: string]

    // get all @event attributes and remove duplicates
    const atEventsRE = /@([\w\-_|:.]+)=["']?(\w+)["']?/gi
    const atEvents: atEvent[] = [
      ...new Set(
        [...template.matchAll(atEventsRE)].map((m) =>
          JSON.stringify(m.slice(0, 3))
        )
      )
    ].map((e) => JSON.parse(e))

    if (atEvents.length) {
      this.eventListeners ??= []
      const eventListenersLength = this.eventListeners.length
      const atEventsLength = atEvents.length

      // run only if atEvents aren't yet added to the eventListeners array
      if (eventListenersLength !== eventListenersLength + atEventsLength) {
        atEvents.forEach(async ([selector, eventName, callbackName]) => {
          const eventTuple: MinzeEvent = [
            `[${selector}]`,
            eventName,
            this[callbackName]
          ]

          this.eventListeners?.push(eventTuple)
        })
      }
    }
  }

  /**
   * Adds or removes a provided event listener.
   *
   * @param eventTuple - The event tuple to be added or removed.
   * @param action - The action to be performed.
   *
   * @example
   * ```
   * this.registerEvent(this.eventListeners[0], 'add')
   * ```
   */
  private registerEvent(eventTuple: MinzeEvent, action: 'add' | 'remove') {
    const [eventTarget, eventName, callback] = eventTuple

    let elements: NodeList | MinzeElement[] | (typeof window)[] | undefined

    if (eventTarget === window) {
      elements = [window]
    } else if (eventTarget instanceof MinzeElement) {
      elements = [this]
    } else if (typeof eventTarget === 'string') {
      const escapeTarget = (name: string) =>
        name.replace(/(@|\||:|\.)/g, (_, $1) => `\\${$1}`)
      elements = this.shadowRoot?.querySelectorAll(escapeTarget(eventTarget))
    }

    elements?.forEach((element: Node | MinzeElement | typeof window) => {
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
   * @param eventName - The name of the event to be dispatched.
   * @param detail - The detail data to be passed with the event.
   *
   * @example
   * ```
   * this.dispatch('minze:update', { amount: 10 })
   * ```
   */
  dispatch(eventName: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
        cancelable: true
      })
    )
  }

  /**
   * @deprecated use dispatch instead.
   */
  cast(eventName: string, detail?: unknown) {
    warn('cast is deprecated use dispatch instead.')
    this.dispatch(eventName, detail)
  }

  /**
   * Automatically exports all parts and exportparts present in the template.
   *
   * @param template - A template function or string with html markup.
   *
   * @example
   * ```
   * this.exportParts(this.html)
   * ```
   */
  private exportParts(template: (() => string) | string) {
    template = typeof template === 'function' ? template() : template

    // get all parts inside the template
    const partsRE = /(?:part|exportparts)=["']?([\w\-_,\s]+)["']?/gi
    const parts = [
      ...new Set(
        [...template.matchAll(partsRE)].flatMap((m) => {
          return m.at(1)?.replace(/,?\s+/g, ',').split(',')
        })
      )
    ].sort()

    if (parts.length) this.setAttribute('exportparts', parts.join(', '))
  }

  /**
   * Adds or removes exportparts attribute observer.
   *
   * @param action - The action to be performed.
   * @param key - The name for the oberver.
   *
   * @example
   * ```
   * this.registerExportpartsObserver('add')
   * ```
   */
  private registerExportpartsObserver(action: 'add' | 'remove') {
    const key = '_exportpartsObserver'
    const add = action === 'add' && !this[key]
    const remove = action === 'remove' && this[key]

    if (add && this.shadowRoot) {
      const callback: MutationCallback = (mutations) => {
        if (mutations && this.shadowRoot) {
          this.exportParts(this.shadowRoot.innerHTML)
        }
      }

      const options = { subtree: true, attributeFilter: ['exportparts'] }

      this[key] = createObserver(this.shadowRoot, callback, options)
    } else if (remove) {
      this[key].disconnect()
      delete this[key]
    }
  }

  /**
   * Logs debug information to the console.
   *
   * @example
   * ```
   * this.debuglog()
   * ```
   */
  private debuglog() {
    if (!console) return

    const hooks = Object.fromEntries(
      [
        'onStart',
        'onReactive',
        'beforeRender',
        'onRender',
        'onReady',
        'onDestroy',
        'onMove',
        'beforeAttributeChange',
        'onAttributeChange'
      ]
        .filter((key) => this[key])
        .map((key) => [[key], this[key]])
    )

    console.groupCollapsed(
      `%c[Minze: ${this.name}] 🚧`,
      'color: rgb(110, 150, 245);'
    )
    ;[
      ['Class: %O', this],
      ['Element: %o', this]
    ].forEach(([msg, value]) => console.log(msg, value))

    console.groupCollapsed('Internals')
    ;[
      ['🧨 eventListeners: %o', this.eventListeners],
      ['🪝 hooks: %o', Object.keys(hooks).length ? hooks : undefined],
      ['🔩 options: %o', this.options],
      [
        '🧬 reactive: %o',
        {
          attrs: this.attrs,
          observedAttributes: this.constructor['observedAttributes'],
          reactive: this.reactive,
          watch: this.watch
        }
      ],
      ['✨ template: %o', { css: this.css, html: this.html }]
    ].forEach(([msg, value]) => console.log(msg, value))

    console.groupEnd()
    console.groupEnd()
  }

  /**
   * Lifecycle (Internal) - Runs whenever the element is appended into a document-connected element.
   */
  private async connectedCallback() {
    this.onStart?.()

    this.reactive?.forEach(async (prop) => this.registerProp(prop))
    this.attrs?.forEach(async (attr) => this.registerAttr(attr))

    this.onReactive?.()

    if (this.options?.exposeAttrs?.exportparts) {
      if (this.html) this.exportParts(this.html) // auto-export all static parts and exportparts
      this.registerExportpartsObserver('add') // observe dynamic exportparts
    }

    await this.render()

    // sets rendered attribute on the component
    if (this.options?.exposeAttrs?.rendered) this.setAttribute('rendered', '')

    this.onReady?.()

    if (this.debug) this.debuglog()
  }

  /**
   * Lifecycle (Internal) - Runs each time the element is disconnected from the document's DOM.
   */
  private async disconnectedCallback() {
    this._cachedTemplate = null

    if (this.options?.exposeAttrs?.exportparts) {
      this.registerExportpartsObserver('remove')
    }

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
   *
   * @param name - The name of the attribute that was changed.
   * @param oldValue - The previous value of the attribute.
   * @param newValue - The new value of the attribute.
   */
  private async attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
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
   * @param name - The name of the attribute that was changed.
   * @param oldValue - The previous value of the attribute.
   * @param newValue - The new value of the attribute.
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
    oldValue?: string | null,
    newValue?: string | null
  ): Promise<void> | void

  /**
   * Lifecycle - Runs each time at the end of the attributeChangedCallback method.
   *
   * This hook runs before the onStart lifecycle, if an attribute is set on the element:
   * `<minze-element text="Hello Minze!" /></minze-element>`
   *
   * @param name - The name of the attribute that was changed.
   * @param oldValue - The previous value of the attribute.
   * @param newValue - The new value of the attribute.
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
    oldValue?: string | null,
    newValue?: string | null
  ): Promise<void> | void
}
