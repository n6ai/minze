# MinzeElement

Base class which can be used to extend from to create custom web components.

## READ-ONLY

::: tip
Read-only Properties/Getters/Methods are present on every component class extending MinzeElement.
:::

### version <Badge type="tip" text="^1.2.0" />

Displays the version of Minze the component was built with.

- **Static Property**

- **Type:** `readonly string`

- **Example:**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {}

console.log(MyElement.version) // 1.2.0
```

### isMinzeElement <Badge type="tip" text="^1.2.0" />

Can by used in conditional checks to determine if the class is a MinzeElement.

- **Static Property**

- **Type:** `readonly true`

- **Example:**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {}

console.log(MyElement.isMinzeElement) // true
```

### name <Badge type="tip" text="^1.9.0" />

The class name of the component.

- **Static Getter / Getter**

- **Type:** `getter`

- **Example:**

::: code-group

```js [class]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {}

console.log(MyElement.name) // MyElement
```

```js [instance]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    console.log(this.name) // MyElement
  }
}
```

:::

### dashName <Badge type="tip" text="^1.9.0" />

The class name of the component in dash-case.

- **Static Getter / Getter**

- **Type:** `getter`

- **Example:**

::: code-group

```js [class]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {}

console.log(MyElement.dashName) // my-element
```

```js [intance]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    console.log(this.dashName) // my-element
  }
}
```

:::

### define <Badge type="tip" text="^1.0.0" />

Defines a custom web component for the current class.

::: warning
Your component class name should be in `PascalCase` when using this registration method.
:::

- **Static Method**

- **Type:** `(name?: string): void`

- **Example:**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  // ...
}

// automatic naming based on the class name
MyElement.define()

// manual naming
MyElement.define('my-custom-element')
```

<!-- prettier-ignore-start -->
```html
<my-element></my-element>
<my-custom-element></my-custom-element>
```
<!-- prettier-ignore-end -->

### log <Badge type="tip" text="^1.9.0" />

Logs to the console. Enhanced version of `console.log()` for debugging.

- **Method**

- **Type:** `(msg: unknown, ...args: unknown[]): void`

- **Example:**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  key = 'value'

  onReady() {
    this.log(this.key) // [Minze: MyElement] 'value'
  }
}
```

## REACTIVE DATA

### reactive <Badge type="tip" text="^1.0.0" />

Dynamically creates reactive properties on the element. A change to a reactive property will request a component re-render. `reactive` should be an array containing one or more strings or tuples.
In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes up to 3 values. The first 2 are required, the third is optional.

Tuple structure: [`name`, `value`, `exposeAttr?`]

1. **name:** has to be a `camelCase` string.
2. **value:** can be any value.
3. **exposeAttr:** (optional) not defined or `true`

::: tip
The created property is always the source of truth and not the exposed attribute. So when changing the attribute value, the property will not be updated. But changing the property value will update the attribute.
:::

::: warning
If you use the shorthand notation and provide a `camelCase` string instead of a tuple for a reactive property, the reactive property will be created with a default value of `null`.
:::

- **Property**

- **Type:** `readonly (string | [name: string, value: unknown, exposeAttr?: boolean])[]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  reactive = [
    'aShorthand', // will be created as null
    ['aString', 'foo'],
    ['aBoolean', false],
    ['anArray', [1, 2, 3], true],
    ['anObject', { foo: 'bar' }]
  ]

  html = () => `
    <div>${this.aString}</div>
  `

  onReady() {
    this.aString = 'bar'

    console.log(
      this.aShorthand, // null
      this.aString, // bar
      this.aBoolean, // false
      this.anArray, // [1, 2, 3]
      this.anObject // { foo: 'bar' }
    )
  }
}
```

```html
<!-- usage -->
<my-element></my-element>

<!-- an-array attribute will be exposed automatically and look like this: -->
<my-element an-array="[1, 2, 3]"></my-element>
```

### attrs <Badge type="tip" text="^1.0.0" />

Dynamically creates reactive properties for attributes. A change to a reactive attribute property will request a component re-render. `attrs` should be an array containing one or more strings or tuples.
In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes up to 2 values. The first 1 is required, the second is optional.

Tuple structure: [`name`, `value?`]

1. **name:** has to be a `dash-case` string.
2. **value:** (optional) not defined or any value type, which will be used to set the initial attribute, if none is found on the HTML element.

::: tip
All created attribute properties can be accessed inside the component with the `camelCase` notation. E.g. for `my-attribute` the attribute property will be `myAttribute`.
:::

::: tip
The attribute on the component is always the source of truth and not the created attribute property. So when the attribute value changes, the property will be updated. But changing the property will **not** update the attribute.
:::

::: tip
Attributes with values from type `undefined`, `null`, `boolean`, `number` or any values that are JSON parsable are automatically converted to the right type inside the component. If the type can't be auto-inferred from the attribute value, then the value is returned as a string.
:::

::: warning
If you use the shorthand notation and provide a `dash-case` string instead of a tuple for a reactive attribute property, the reactive attribute property will be created with a default value of `null`.
:::

::: danger
For attribute property updates to be effective (on attribute changes), you have to make these attributes **observable**. It can be done by providing them to **[observedAttributes](#observedattributes)**.
:::

- **Property**

- **Type:** `readonly (string | [name: string, value?: unknown])[]`

- **Example:**

<!-- prettier-ignore-start -->
```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  attrs = [
    'text',
    ['bg-color', '#000'],
    ['json-parsable', { key: 'value' }]
  ]

  onReady() {
    console.log(this.text, this.bgColor)
  }
}
```
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
```html
<!-- usage -->
<my-element text="Hello Minze!"></my-element>

<!--
  bg-color and json-parsable attributes will be created on the element,
  since no attribute was provided and an initial value is defined
-->
<my-element
  text="Hello Minze!"
  bg-color="#000"
  json-parsable="{&quot;key&quot;:&quot;value&quot;}"
></my-element>
```
<!-- prettier-ignore-end -->

### observedAttributes <Badge type="tip" text="^1.0.0" />

Observes the provided attribute names and updates any attribute properties defined by `attrs` accordingly. When an observed attribute changes, the `beforeAttributeChange` and `onAttributeChange` hooks are called.

::: warning
`observedAttributes` has to be a `static` property.
:::

- **Static Property**

- **Type:** `string[]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  attrs = ['text', ['bg-color', '#000']]

  static observedAttributes = ['text', 'bg-color']

  onAttributeChange() {
    console.log(this.text, this.bgColor)
  }
}
```

### watch <Badge type="tip" text="^1.0.0" />

Watches the given reactive properties and calls the provided callback whenever a change is detected. `watch` should be an array containing one or more tuples. In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes exactly 2 values.

Tuple structure: [`name`, `callback`]

1. **name:** the reactive property name to watch. Has to be `camelCase`, can be optionally `dash-case` for reactive attributes declared in `attrs`.
2. **callback:** a callback function that runs whenever one of the property's values changes. Can be asynchronous.

::: warning
`watch` only works with reactive properties that were defined with `reactive` or `attrs`.
:::

- **Property**

- **Type:** `readonly [name: string, callback: (newValue?: any, oldValue?: any, key?: string, target?: object | typeof MinzeElement) => Promise<void> | void][]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  reactive = [['count', 0]]

  watchCount = (newValue, oldValue, key, target) => {
    console.log(newValue, oldValue, key, target) // 1, 0, count, this
  }

  watch = [['count', this.watchCount]]

  onReady() {
    this.count = 1
  }
}
```

## TEMPLATE

### html <Badge type="tip" text="^1.0.0" />

Defines the elements `HTML` template.

- **Method**

- **Type:** `(): string`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div>Hello Minze!</div>
  `
}
```

### css <Badge type="tip" text="^1.0.0" />

Defines the elements scoped `CSS` template.

- **Method**

- **Type:** `(): string`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  css = () => `
    :host {
      background: rgb(55 245 220);
    }
  `
}
```

### rerender <Badge type="tip" text="^1.0.0" />

Requests a component re-render, invalidating all caches.

- **Method**

- **Type:** `(): void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div>Hello Minze!</div>
  `

  onReady() {
    this.rerender()
  }
}
```

## SELECTORS

### select <Badge type="tip" text="^1.0.0" />

Selects the first matching element for the given `CSS` selector inside the `html` template.

::: tip
Best place to use `select` is inside the `onRender` and `onReady` Hooks.
:::

- **Method**

- **Type:** `(selectors: string): Element | null`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div id="my-div"></div>
    <div></div>
  `

  onReady() {
    const element = this.select('#my-div')
    console.log(element)
  }
}
```

### selectAll <Badge type="tip" text="^1.0.0" />

Selects all elements matching the given `CSS` selector inside the `html` template.

::: tip
Best place to use `selectAll` is inside the `onRender` and `onReady` Hooks.
:::

- **Method**

- **Type:** `(selectors: string): NodeListOf<Element> | null`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div></div>
    <div></div>
  `

  onReady() {
    const elements = this.selectAll('div')
    console.log(elements)
  }
}
```

### slotted <Badge type="tip" text="^1.4.0" />

Returns an array of slotted element(s) for provided slot name, otherwise `null` if none found.

::: tip
Best place to use `slotted` is inside the `onRender` and `onReady` Hooks.
:::

- **Method**

- **Type:** `(name?: string): Element[] | null`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <slot></slot>
    <slot name="named-slot"></slot>
  `

  onReady() {
    const defaultSlottedElements = this.slotted('default')
    const namedSlottedElements = this.slotted('named-slot')
    console.log(defaultSlottedElements, namedSlottedElements)
  }
}
```

## EVENTS

### eventListeners <Badge type="tip" text="^1.0.0" />

Dynamically creates event listeners, either on/inside the component or on the `window` object. `eventListeners` should be an array containing one or more tuples. In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes exactly 3 values.

Tuple structure: [`eventTarget`, `eventName`, `callback`]

1. **eventTarget:** where the event listener should be attached to. Can be a valid CSS selector (for elements inside the `html` property), `this` (The component itself) or `window`.
2. **eventName:** the name of the event to listen to.
3. **callback:** a callback function that runs when the eventName is matched.

::: warning
Web components are meant to be encapsulated HTML elements, it's a bad idea to create event listeners inside the component and attach them all over the place. That's why the targets outside of the component are intentionally limited to the `window` object, to prevent `event-listener-pollution`.
:::

::: danger
When passing a method as a callback, make sure it's either defined as an arrow function or properly bound to the component.
:::

- **Property**

- **Type:** `readonly [eventTarget: string | MinzeElement | typeof Window, eventName: string, callback: (event: Event) => void][]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <button class="button">
      Button
    </button>
  `

  handleClick = () => {
    const optionalDetail = {
      msg: 'Hello Minze!'
    }

    this.dispatch('minze:my-event-name', optionalDetail)
  }

  handleDispatch = (event) => {
    console.log(event.detail)
  }

  /*
   * Passing a callback to eventListeners
   *
   * Regular methods have to be bound to the component
   * in order to access any properties or methods of the component.
   * Properties defined with arrow functions don't need to be bound,
   * since they don't have their own 'this' binding
   * and instead are bound to the component by default.
   */
  handleNestedDispatch(event) {
    console.log(event.detail)
  }

  eventListeners = [
    ['.button', 'click', this.handleClick],
    [window, 'minze:my-event-name', this.handleDispatch],
    [this, 'minze:my-nested-event-name', this.handleNestedDispatch.bind(this)]
  ]
}
```

### dispatch <Badge type="tip" text="^1.3.2" />

Dispatches a custom event from the element.

::: tip
It's a good idea to prefix your custom event names to avoid collisions with other libraries.
:::

- **Method**

- **Type:** `(eventName: string, detail?: unknown): void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady() {
    const optionalDetail = {
      msg: 'Hello Minze!'
    }

    this.dispatch('minze:ready', optionalDetail)
  }
}
```

## HOOKS

### onStart <Badge type="tip" text="^1.0.0" />

A Hook that runs `once` after the element is added to the DOM, but before the internal lifecycle, like creating reactive properties, or rendering the template. Can either be a regular or async method.

::: tip
This hook runs after the `beforeAttributeChange` and `onAttributeChange` hooks if any `observed` attributes are present on the element.
:::

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onStart() {
    console.log('onStart')
  }
}
```

### onReactive <Badge type="tip" text="^1.0.0" />

A Hook that runs `once` after the element is added to the DOM, and all reactive properties are initialized but before rendering the template. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReactive() {
    console.log('onReactive')
  }
}
```

### onReady <Badge type="tip" text="^1.0.0" />

A Hook that runs `once` after the element is added to the DOM and the entire component lifecycle is finished. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady() {
    console.log('onReady')
  }
}
```

### onDestroy <Badge type="tip" text="^1.0.0" />

A Hook that runs `once` after the element is disconnected from the document's DOM and all its event listeners are removed. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onDestroy() {
    console.log('onDestroy')
  }
}
```

### onMove <Badge type="tip" text="^1.0.0" />

A Hook that runs `once` after the element is moved to a new document but before it's rendered. Can either be a regular or async method.

::: tip
If the element is moved within the same document, this hook will not be called.
:::

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onMove() {
    console.log('onMove')
  }
}
```

### beforeRender <Badge type="tip" text="^1.0.0" />

A Hook that runs `each time` bofore a template render. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  beforeRender() {
    console.log('beforeRender')
  }
}
```

### onRender <Badge type="tip" text="^1.0.0" />

A Hook that runs `each time` after a template render. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onRender() {
    console.log('onRender')
  }
}
```

### beforeAttributeChange <Badge type="tip" text="^1.0.0" />

A Hook that runs `each time` before any [observed attribute](#observedattributes) changes. Can either be a regular or async method.

- **Method**

- **Type:** `(name?: string, oldValue?: string | null, newValue?: string | null): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  beforeAttributeChange(name, oldValue, newValue) {
    console.log('beforeAttributeChange: ', name, oldValue, newValue)
  }
}
```

### onAttributeChange <Badge type="tip" text="^1.0.0" />

A Hook that runs `each time` after any [observed attribute](#observedattributes) changes. Can either be a regular or async method.

- **Method**

- **Type:** `(name?: string, oldValue?: string | null, newValue?: string | null): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onAttributeChange(name, oldValue, newValue) {
    console.log('onAttributeChange: ', name, oldValue, newValue)
  }
}
```

## MISC

### options <Badge type="tip" text="^1.0.0" />

Individual components can be customized by declaring an options property. All currently available options are listed in the example below with their **default values**.

- **Property**

- **Type:** `Object`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  options = {
    cssReset: true, // Apply CSS reset styles to the components Shadow DOM.
    debug: false, // Log information about the component to the console.
    exposeAttrs: {
      exportparts: false, // Expose an 'exportparts' attribute on the element that includes all parts present in the component. E.g. <my-element exportparts="button, headline"></my-element>
      rendered: false // Expose a 'rendered' attribute on the element, after it's rendered for the first time. E.g. <my-element rendered></my-element>
    }
  }
}
```

## DEPRECATED

### cast <Badge type="warning" text="deprecated" />

Use [dispatch](/api/minze-element#dispatch) instead.
