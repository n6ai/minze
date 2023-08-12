# MinzeElement

Base class for custom web components.

## READ-ONLY

::: tip
Read-only Properties/Getters/Methods are present on every component class extending MinzeElement.
:::

### version <Badge type="tip" text="^1.2.0" />

Displays the version of Minze the component was built with.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {}

console.log(MyElement.version) // '1.2.0'
```

```ts [Type]
(property) MinzeElement.version: "__VERSION__"
```

:::

### isMinzeElement <Badge type="tip" text="^1.2.0" />

Returns `true` if class is a MinzeElement.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {}

console.log(MyElement.isMinzeElement) // true
```

```ts [Type]
(property) MinzeElement.isMinzeElement: true
```

:::

### name <Badge type="tip" text="^1.9.0" />

The class name of the component.

::: code-group

```js [Code (Outside)]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {}

console.log(MyElement.name) // 'MyElement'
```

```js [Code (Inside)]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    console.log(this.name) // 'MyElement'
  }
}
```

```ts [Type]
(getter) MinzeElement.name: string
```

:::

### dashName <Badge type="tip" text="^1.9.0" />

The class name of the component in `dash-case`.

::: code-group

```js [Code (Outside)]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {}

console.log(MyElement.dashName) // 'my-element'
```

```js [Code (Inside)]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    console.log(this.dashName) // 'my-element'
  }
}
```

```ts [Type]
(getter) MinzeElement.dashName: string
```

:::

### define <Badge type="tip" text="^1.0.0" />

Defines a custom web component of the current class.

::: warning
Your component class name should be in `PascalCase` when using this registration method.
:::

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {}

MyElement.define() // automatic naming based on the class name
MyElement.define('my-custom-element') // manual naming
```

```ts [Type]
(method) MinzeElement.define(name?: string): void
```

:::

<!-- prettier-ignore-start -->
```html
<my-element></my-element>
<my-custom-element></my-custom-element>
```
<!-- prettier-ignore-end -->

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

::: danger
Never destructure `reactive` properties, otherwise the destructured values lose their reactivity.
:::

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  reactive = [
    'aShorthand', // will be created as null
    ['aString', 'foo'],
    ['aBoolean', false],
    ['anArray', [1, 2, 3], true],
    ['anObject', { foo: 'bar' }]
  ]

  html = () => `<div>${this.aString}</div>`

  onReady() {
    this.aString = 'bar'

    console.log(
      this.aShorthand, // null
      this.aString, // 'bar'
      this.aBoolean, // false
      this.anArray, // [1, 2, 3]
      this.anObject // { foo: 'bar' }
    )
  }
}
```

```ts [Type]
(property) MinzeElement.reactive?: Reactive | undefined
// for 'Reactive' type see: https://minze.dev/api/type-helpers#reactive
```

:::

::: code-group

```html [HTML]
<my-element></my-element>
```

```html [HTML (Rendered)]
<!-- an-array attribute will be exposed automatically and look like this: -->
<my-element an-array="[1, 2, 3]"></my-element>
```

:::

### attrs <Badge type="tip" text="^1.0.0" />

Dynamically creates reactive properties for attributes. A change to a reactive attribute property will request a component re-render. `attrs` should be an array containing one or more strings or tuples.
In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes up to 2 values. The first 1 is required, the second is optional.

Tuple structure: [`name`, `value?`]

1. **name:** has to be a `dash-case` string.
2. **value:** (optional) not defined or any value type, which will be used to set the initial attribute, if none is found on the HTML element.

::: tip
The attribute on the element is always the source of truth and not the created attribute property inside the component. So when the attribute value changes, the property will be updated. But changing the property will **not** update the attribute.
:::

::: tip
All created attribute properties can be accessed inside the component with the `camelCase` notation. E.g. for `my-attribute` the attribute property will be `myAttribute`.
:::

::: tip
Attributes with values from type `undefined`, `null`, `boolean`, `number` or any values that are JSON parsable are automatically converted to the right type inside the component. If the type can't be auto-inferred from the attribute value, then the value is returned as a string.
:::

::: warning
If you use the shorthand notation and provide a `dash-case` string instead of a tuple for a reactive attribute property, the reactive attribute property will be created with a default value of `null`.
:::

::: danger
For attribute property updates to be effective (on attribute changes on the element), you have to make these attributes **observable**. It can be done by providing them to **[observedAttributes](#observedattributes)**.
:::

::: code-group

<!-- prettier-ignore-start -->
```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  attrs = [
    'text',
    ['bg-color', '#000'],
    ['json-parsable', { key: 'value' }]
  ]

  onReady() {
    console.log(this.text, this.bgColor) // null, '#000'
  }
}
```
<!-- prettier-ignore-end -->

```ts [Type]
(property) MinzeElement.attrs?: Attrs | undefined
// for 'Attrs' type see: https://minze.dev/api/type-helpers#attrs
```

:::

::: code-group

```html [HTML]
<my-element text="Hello Minze!"></my-element>
```

<!-- prettier-ignore-start -->
```html [HTML (Rendered)]
<my-element
  text="Hello Minze!"
  bg-color="#000"
  json-parsable="{&quot;key&quot;:&quot;value&quot;}"
></my-element>

<!--
  bg-color and json-parsable attributes will be created on the element,
  since no attribute was provided and an initial value is defined
-->
```
<!-- prettier-ignore-end -->

:::

### observedAttributes <Badge type="tip" text="^1.0.0" />

Observes attributtes on the element that are defined in `observedAttributes` array and updates any attribute properties defined by `attrs` accordingly. When an observed attribute changes, the `beforeAttributeChange` and `onAttributeChange` hooks are called.

::: warning
`observedAttributes` has to be a `static` property.
:::

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  attrs = ['text', ['bg-color', '#000']]

  static observedAttributes = ['text', 'bg-color']

  onAttributeChange() {
    console.log(this.text, this.bgColor) // whatever the new values are
  }
}
```

```ts [Type]
(property) MinzeElement.observedAttributes?: string[] | undefined
```

:::

### watch <Badge type="tip" text="^1.0.0" />

Watches the given reactive properties and calls the provided callback whenever a change is detected. `watch` should be an array containing one or more tuples. In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes exactly 2 values.

Tuple structure: [`name`, `callback`]

1. **name:** the reactive property name to watch. Has to be `camelCase`, can be optionally `dash-case` for reactive attributes declared in `attrs`.
2. **callback:** a callback function that runs whenever one of the property's values changes. Can be asynchronous.

::: warning
`watch` only works with reactive properties that were defined with `reactive` or `attrs`.
:::

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  reactive = [['count', 0]]

  watchCount = (newValue, oldValue, key, target) => {
    console.log(newValue, oldValue, key, target) // 1, 0, 'count', MyElement
  }

  watch = [['count', this.watchCount]]

  onReady() {
    this.count = 1
  }
}
```

```ts [Type]
(property) MinzeElement.watch?: Watch | undefined
// for 'Watch' type see: https://minze.dev/api/type-helpers#watch
```

:::

## TEMPLATE

### html <Badge type="tip" text="^1.0.0" />

Defines the components `HTML` template.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div>Hello Minze!</div>
  `
}
```

```ts [Type]
(method) MinzeElement.html?(): string
```

:::

### css <Badge type="tip" text="^1.0.0" />

Defines the components scoped `CSS` template.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  css = () => `
    :host {
      background: rgb(55 245 220);
    }
  `
}
```

```ts [Type]
(method) MinzeElement.css?(): string
```

:::

### rerender <Badge type="tip" text="^1.0.0" />

Requests a component re-render, invalidating all caches.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `<div>Hello Minze!</div>`

  onReady() {
    this.rerender()
  }
}
```

```ts [Type]
(method) MinzeElement.rerender(): void
```

:::

## SELECTORS

::: tip
The safest place to use `select`, `selectAll` and `slotted` is inside the `onRender` and `onReady` Hooks, when the template has already rendered.
:::

### select <Badge type="tip" text="^1.0.0" />

Selects the first matching element for the given `CSS` selector inside the `html` template.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div id="my-div"></div>
    <div></div>
  `

  onReady() {
    const element = this.select('#my-div')
    console.log(element) // <div id="my-div"></div>
  }
}
```

```ts [Type]
(method) MinzeElement.select<E extends Element = Element>(selectors: string): E | null
```

:::

### selectAll <Badge type="tip" text="^1.0.0" />

Selects all elements matching the given `CSS` selector inside the `html` template.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div></div>
    <div></div>
  `

  onReady() {
    const elements = this.selectAll('div')
    console.log(elements) // [div, div]
  }
}
```

```ts [Type]
(method) MinzeElement.selectAll<E extends Element = Element>(selectors: string): NodeListOf<E> | null
```

:::

### slotted <Badge type="tip" text="^1.4.0" />

Returns an array of slotted element(s) for provided slot name.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <slot></slot>
    <slot name="named-slot"></slot>
  `

  onReady() {
    const defaultSlotted = this.slotted('default')
    const namedSlotted = this.slotted('named-slot')
    console.log(defaultSlotted, namedSlotted) // slotted elements
  }
}
```

```ts [Type]
(method) MinzeElement.slotted(name?: string): Element[] | null
```

:::

## EVENTS

### eventListeners <Badge type="tip" text="^1.0.0" />

Dynamically creates event listeners, either on/inside the component or on the `window` object. `eventListeners` should be an array containing one or more tuples. In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes exactly 3 values.

Tuple structure: [`eventTarget`, `eventName`, `callback`]

1. **eventTarget:** where the event listener should be attached to. Can be a valid CSS selector (for elements inside the `html` property), `this` (The component itself), `window` or a `BroadcastChannel`.
2. **eventName:** the name of the event to listen to.
3. **callback:** a callback function that runs when the eventName is matched.

::: warning
Web components are meant to be encapsulated HTML elements, it's a bad idea to create event listeners inside the component and attach them all over the place. That's why the targets outside of the component are intentionally limited to the `window` object.
:::

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `<button class="button">Click me!</button>`

  handleClick = () => {
    this.dispatch('minze:event', {
      msg: 'Hello Minze!'
    })
  }

  handleDispatch = (event) => {
    console.log(event.detail) // {msg: 'Hello Minze!'}
  }

  eventListeners = [
    ['.button', 'click', this.handleClick],
    [this, 'minze:event', this.handleDispatch],
    [window, 'minze:event', this.handleDispatch]
  ]
}
```

```ts [Type]
(property) MinzeElement.eventListeners?: EventListeners | undefined
// for 'EventListeners' type see: https://minze.dev/api/type-helpers#eventlisteners
```

:::

### dispatch <Badge type="tip" text="^1.3.2" />

Dispatches a custom event from inside the component.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady() {
    this.dispatch('minze:ready', { msg: 'Hello Minze!' })
  }
}
```

```ts [Type]
(method) MinzeElement.dispatch(eventName: string, detail?: unknown): void
```

:::

## HOOKS

::: tip
All hooks can be defined as asynchronous with the `async` keyword. E.g. `async onStart () {}`
:::

### onStart <Badge type="tip" text="^1.0.0" />

A Hook that runs `once` after the element is added to the DOM, but before the internal lifecycle, like creating reactive properties, or rendering the template.

::: tip
This hook runs after the `beforeAttributeChange` and `onAttributeChange` hooks if any `observed` attributes are defined on the component.
:::

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onStart() {
    console.log('onStart') // 'onStart'
  }
}
```

```ts [Type]
(method) MinzeElement.onStart?(): Promise<void> | void
```

:::

### onReactive <Badge type="tip" text="^1.0.0" />

A Hook that runs `once` after the element is added to the DOM, and all reactive properties are initialized but before rendering the template.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReactive() {
    console.log('onReactive') // 'onReactive'
  }
}
```

```ts [Type]
(method) MinzeElement.onReactive?(): Promise<void> | void
```

:::

### onReady <Badge type="tip" text="^1.0.0" />

A Hook that runs `once` after the element is added to the DOM and the entire component lifecycle is finished.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady() {
    console.log('onReady') // 'onReady'
  }
}
```

```ts [Type]
(method) MinzeElement.onReady?(): Promise<void> | void
```

:::

### onDestroy <Badge type="tip" text="^1.0.0" />

A Hook that runs `once` after the element is disconnected from the document's DOM and all its event listeners are removed.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onDestroy() {
    console.log('onDestroy') // 'onDestroy'
  }
}
```

```ts [Type]
(method) MinzeElement.onDestroy?(): Promise<void> | void
```

:::

### onMove <Badge type="tip" text="^1.0.0" />

A Hook that runs `once` after the element is moved to a new document but before it's rendered.

::: tip
If the element is moved within the same document, this hook will not be called.
:::

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onMove() {
    console.log('onMove') // 'onMove'
  }
}
```

```ts [Type]
(method) MinzeElement.onMove?(): Promise<void> | void
```

:::

### beforeRender <Badge type="tip" text="^1.0.0" />

A Hook that runs `each time` bofore a template render.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  beforeRender() {
    console.log('beforeRender') // 'beforeRender'
  }
}
```

```ts [Type]
(method) MinzeElement.beforeRender?(): Promise<void> | void
```

:::

### onRender <Badge type="tip" text="^1.0.0" />

A Hook that runs `each time` after a template render.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onRender() {
    console.log('onRender') // 'onRender'
  }
}
```

```ts [Type]
(method) MinzeElement.onRender?(): Promise<void> | void
```

:::

### beforeAttributeChange <Badge type="tip" text="^1.0.0" />

A Hook that runs `each time` before any of the [observed attributes](#observedattributes) change.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  beforeAttributeChange(name, oldValue, newValue) {
    console.log('beforeAttributeChange: ', name, oldValue, newValue)
  }
}
```

```ts [Type]
(method) MinzeElement.beforeAttributeChange?(name?: string, oldValue?: string | null, newValue?: string | null): Promise<void> | void
```

:::

### onAttributeChange <Badge type="tip" text="^1.0.0" />

A Hook that runs `each time` after any of the [observed attributes](#observedattributes) change.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onAttributeChange(name, oldValue, newValue) {
    console.log('onAttributeChange: ', name, oldValue, newValue)
  }
}
```

```ts [Type]
(method) MinzeElement.onAttributeChange?(name?: string, oldValue?: string | null, newValue?: string | null): Promise<void> | void
```

:::

## MISC

### options <Badge type="tip" text="^1.0.0" />

Individual components can be customized by declaring an options property. All currently available options are listed in the example below with their **default values**.

::: code-group

```js [Code]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  options = {
    cssReset: true, // Apply CSS reset styles to the components Shadow DOM.
    exposeAttrs: {
      exportparts: false, // Expose an 'exportparts' attribute on the element that includes all parts present in the component. E.g. <my-element exportparts="button, headline"></my-element>
      rendered: false // Expose a 'rendered' attribute on the element, after it's rendered for the first time. E.g. <my-element rendered></my-element>
    }
  }
}
```

```ts [Type]
(property) MinzeElement.options?: {
  cssReset?: boolean | undefined;
  exposeAttrs?: {
    exportparts?: boolean | undefined;
    rendered?: boolean | undefined;
  } | undefined;
} | undefined
```

:::

## DEPRECATED

### cast <Badge type="warning" text="deprecated" />

Use [dispatch](/api/minze-element#dispatch) instead.
