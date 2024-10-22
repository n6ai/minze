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
    newValue?: any,
    oldValue?: any,
    key?: string,
    target?: object | typeof MinzeElement
  ) => Promise<void> | void
]

export type MinzeEvent = [
  eventTarget: string | MinzeElement | typeof window | BroadcastChannel,
  eventName: string,
  callback: (event: any) => void
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
 * MinzeElement: Base class for custom web components.
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
  static readonly version = __VERSION__

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
   *   onStart = () => {
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
   *   onStart = () => {
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

    if (customElements && !customElements.get(name)) {
      customElements.define(name, this)
    }
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
   *       exportparts: false,
   *       rendered: false
   *     },
   *     viewTransitions: false
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
    viewTransitions?: boolean
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
   * - local: this, a BroadcastChannel, or any elements inside the shadow DOM (by passing a valid CSS selector string)
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   eventListeners = [
   *     ['.my-class', 'click', () => {}],
   *     [this, 'minze:event', () => {}],
   *     [window, 'resize', () => {}],
   *     [new BroadcastChannel('$'), 'message', () => {}]
   *   ]
   * }
   * ```
   */
  eventListeners?: EventListeners

  /**
   * Enhanced eventListeners with merged on-events and callbacks binded to the component.
   *
   * @example
   * ```
   * this._eventListeners
   * ```
   */
  private _eventListeners?: MinzeEvent[]

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
   * HTML template (Internal)
   */
  private _html: { cached: string | null; template: () => Promise<string> } = {
    cached: null,
    template: async () => this.html?.() ?? '<slot></slot>'
  }

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
   * CSS template (Internal)
   */
  private _css: { cached: string | null; template: () => Promise<string> } = {
    cached: null,
    template: async () => {
      const cssReset =
        this.options?.cssReset || this.options?.cssReset === undefined

      // prettier-ignore
      return `
        @layer reset, default; @layer reset {
          :host { box-sizing: border-box; display: block; }
          :host([hidden]) { display: none; }
          :where(*, ::before, ::after, :host::before, :host::after):not([no-css-reset]) { box-sizing: border-box; ${cssReset ? 'color: inherit; text-decoration: inherit; font-size: inherit; line-height: inherit; font-weight: inherit; font-family: inherit; text-indent: 0; background-color: transparent; border: 0 solid transparent; padding: 0; margin: 0;' : '' }}
          ${cssReset ? `
          :where(table):not([no-css-reset]) { border-color: inherit; border-collapse: collapse; }
          :where(img, svg, video, canvas, audio, iframe, embed, object):not([no-css-reset]) { display: block; max-width: 100%; height: auto; }
          :where(button, [role="button"]):not([no-css-reset]) { font-size: 100%; text-transform: none; cursor: pointer; }
          ` : '' }}
        ${`@layer default {${this.css?.()}}`}
      `
    }
  }

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
      const html = await this._html.template()
      const css = await this._css.template()

      if (css !== this._css.cached || force) {
        // prevent blocking via async function
        ;(async () => {
          this._css.cached = css // cache early

          if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [
              await new CSSStyleSheet().replace(css)
            ]
          }
        })()
      }

      if (html !== this._html.cached || force) {
        const prevCachedHTML = this._html.cached
        this._html.cached = html // cache early

        await this.beforeRender?.()

        this._eventListeners?.forEach(async (eventTuple) =>
          this.registerEvent(eventTuple, 'remove')
        )

        if (!prevCachedHTML || force) {
          this.shadowRoot.innerHTML = html
        } else {
          // patches only the difference between the new template and the current shadow dom
          deepPatch(html, prevCachedHTML, this.shadowRoot)
        }

        // enhance eventListeners with on-events and binding
        const mergedEvents = await this.mergeEvents(
          this._eventListeners,
          this.html
        )
        this._eventListeners = await this.bindEvents(mergedEvents)

        this._eventListeners?.forEach(async (eventTuple) =>
          this.registerEvent(eventTuple, 'add')
        )

        this.afterRender?.()
        this.onRender?.()
      }
    }
  }

  /**
   * Leverages the View Transition API while rendering.
   *
   * @param force - Forces the re-rendering of the template regardless of caching.
   *
   * @url https://developer.mozilla.org/docs/Web/API/View_Transitions_API
   *
   * @example
   * ```
   * this.renderWithTransition()
   * ```
   */
  private async renderWithTransition(force?: boolean) {
    if (this.options?.viewTransitions && document.startViewTransition) {
      document.startViewTransition(async () => this.render(force))
    } else {
      this.render(force)
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
    this.renderWithTransition(true)
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
   * Can be used inside the `afterRender` or `onReady` hooks.
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
        callback = callback.bind(this)
        callback(newValue, oldValue, key, target)
      }
    })

    this.renderWithTransition()
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
          if (typeof value === 'object' && value && !value[isProxy]) {
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
        const value = this.getAttribute(dashName)?.trim()

        // try to auto-convert the attribute value to the proper type,
        // otherwise return the value as a string
        if (value == null) {
          return null
        } else if (value === 'undefined') {
          return undefined
        } else if (value === '') {
          return true // return set attributes without values as true
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
   * Merges any on:events from the provided template with the eventListeners array.
   *
   * @param eventListeners - An eventListeners array.
   * @param template - A template function or string with html markup.
   *
   * @example
   * ```
   * this.mergeEvents(this._eventListeners, this.html)
   * ```
   */
  private async mergeEvents(
    eventListeners?: EventListeners,
    template?: (() => string) | string
  ) {
    if (!template) return eventListeners

    template = typeof template === 'function' ? template() : template

    type onEvent = [attribute: string, event: string, callback: string]

    // get all on:event attributes and remove duplicates
    const onEventsRE =
      /(?<=\s+)(?:on:|@)([\w\-:.]+)(?:=(?:"|')?(\w+)(?:"|')?)?(?=\s+|\/|>)/gi
    const onEvents: onEvent[] = [
      ...new Set(
        [...template.matchAll(onEventsRE)].map((m) =>
          JSON.stringify(m.slice(0, 3))
        )
      )
    ].map((e) => JSON.parse(e))

    const onEventsLength = onEvents.length
    const eventListenersLength = eventListeners?.length ?? 0

    // run only if on:events aren't yet added to the eventListeners array
    if (
      onEventsLength &&
      eventListenersLength !== eventListenersLength + onEventsLength
    ) {
      eventListeners ??= []

      const escape = (name: string) =>
        name.replace(/(@|:|\.)/g, (_, $1) => `\\${$1}`)

      return onEvents.map(
        ([selector, eventName, callbackName]) =>
          [
            `[${escape(selector)}]`,
            eventName,
            this[callbackName ?? eventName]
          ] as MinzeEvent
      )
    }

    return eventListeners
  }

  /**
   * Automatically binds all event listener callbacks that are component methods.
   *
   * @param eventListeners - An eventListeners array.
   *
   * @example
   * ```
   * this.bindEvents(this._eventListeners)
   * ```
   */
  private async bindEvents(eventListeners?: EventListeners) {
    if (!eventListeners) return

    return eventListeners.map((eventTuple) => {
      const callback = eventTuple[2]
      const isUnboudMethod =
        callback && this[callback.name] && !callback.name.startsWith('bound ')

      if (isUnboudMethod) eventTuple[2] = callback.bind(this)

      return eventTuple
    })
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
    type EventTarget = Node | MinzeElement | typeof window | BroadcastChannel
    type EventTargetList = EventTarget[] | NodeList

    const [eventTarget, eventName, callback] = eventTuple

    let elements: EventTargetList | undefined

    if (eventTarget === window || eventTarget instanceof BroadcastChannel) {
      elements = [eventTarget]
    } else if (eventTarget instanceof MinzeElement) {
      elements = [this]
    } else if (typeof eventTarget === 'string') {
      elements = this.shadowRoot?.querySelectorAll(eventTarget)
    }

    elements?.forEach((element: EventTarget) => {
      if (action === 'add') element.addEventListener(eventName, callback)
      else element.removeEventListener(eventName, callback)
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
          return m.at(1)?.trim().replace(/,?\s+/g, ',').split(',')
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
        'afterRender',
        'onReady',
        'onDestroy',
        'onMove',
        'beforeAttributeChange',
        'afterAttributeChange'
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
      ['🧨 eventListeners: %o', this._eventListeners],
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
      ['✨ template: %o', { css: this._css, html: this._html }]
    ].forEach(([msg, value]) => console.log(msg, value))

    console.groupEnd()
    console.groupEnd()
  }

  /**
   * Lifecycle (Internal) - Runs whenever the element is appended into a document-connected element.
   */
  private async connectedCallback() {
    this.onStart?.()

    if (this.eventListeners) this._eventListeners = [...this.eventListeners]

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
    this._html.cached = null
    this._css.cached = null

    if (this.options?.exposeAttrs?.exportparts) {
      this.registerExportpartsObserver('remove')
    }

    this._eventListeners?.forEach(async (eventTuple) =>
      this.registerEvent(eventTuple, 'remove')
    )

    this.onDestroy?.()
  }

  /**
   * Lifecycle (Internal) - Runs each time the element is moved to a new document.
   */
  private async adoptedCallback() {
    this._eventListeners?.forEach(async (eventTuple) =>
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

    this.afterAttributeChange?.(name, oldValue, newValue)
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
  onStart?(): Promise<any> | any

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
  onReactive?(): Promise<any> | any

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
  onReady?(): Promise<any> | any

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
  onDestroy?(): Promise<any> | any

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
  onMove?(): Promise<any> | any

  /**
   * Lifecycle - Runs each time at before of every render.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   beforeRender = () => console.log('beforeRender')
   * }
   * ```
   */
  beforeRender?(): Promise<any> | any

  /**
   * Lifecycle - Runs each time at the end of every render.
   *
   * @example
   * ```
   * class MyElement extends MinzeElement {
   *   afterRender = () => console.log('afterRender')
   * }
   * ```
   */
  afterRender?(): Promise<any> | any

  /**
   * @deprecated use afterRender instead.
   */
  onRender?(): typeof this.afterRender

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
  ): Promise<any> | any

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
   *   afterAttributeChange = (name, oldValue, newValue) => console.log('afterAttributeChange')
   * }
   * ```
   */
  afterAttributeChange?(
    name?: string,
    oldValue?: string | null,
    newValue?: string | null
  ): Promise<any> | any

  /**
   * @deprecated use afterAttributeChange instead.
   */
  onAttributeChange?: typeof this.afterAttributeChange
}
