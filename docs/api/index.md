# API Reference

All publicly intended API methods, properties and types are listed below.

<!------- Minze class ------->

## Minze

Minze class with multiple static methods and properties for common tasks.

### define

Defines a custom web component.

- **Method**

- **Type:** `(name: string, element: typeof MinzeElement): void`

- **Example:**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  // ...
}

Minze.define('my-element', MyElement)
```

```html
<my-element></my-element>
```

### defineAll

Defines all custom web components in a single call. Your components will be registered with `dash-case` naming.

::: warning
Your component class names have to be either in `PascalCase` or `camelCase` when using this registration method.
:::

- **Method**

- **Type:** `(elements: (typeof MinzeElement)[]): void`

- **Example:**

```js
import Minze, { MinzeElement } from 'minze'

class MyFirstElement extends MinzeElement {
  // ...
}

class MySecondElement extends MinzeElement {
  // ...
}

Minze.defineAll([MyFirstElement, MySecondElement])
```

<!-- prettier-ignore-start -->
```html
<my-first-element></my-first-element>
<my-second-element></my-second-element>
```
<!-- prettier-ignore-end -->

### cast

Dispatches a custom event from the `window` object. Shorthand for `Broadcasting`, not to be confused with `Type casting`.

- **Method**

- **Type:** `(eventName: string, detail?: unknown): void`

- **Example:**

```js
import Minze from 'minze'

const myDetailData = {
  foo: 'bar'
}

Minze.cast('minze:my-event-name', myDetailData)
```

### listen

Adds an event listener to the `window` object.

- **Method**

- **Type:** `(eventName: string, callback: (event: Event) => void): void`

- **Example:**

```js
import Minze from 'minze'

const callback = (event) => {
  console.log(event.detail)
}

Minze.listen('minze:my-event-name', callback)
```

### stopListen

Remove an event listener from the `window` object.

- **Method**

- **Type:** `(eventName: string, callback: (event: Event) => void): void`

- **Example:**

```js
import Minze from 'minze'

const callback = (event) => {
  // do something
}

Minze.stopListen('minze:my-event-name', callback)
```

<!------- MinzeElement class ------->

## MinzeElement

Base class which can be extended from to create custom web components.

### options

Individual components can be customized by declaring an options property. All currently available options are listed in the example below with their **default values**.

- **Property**

- **Type:** `Object`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  options: {
    exposeAttrs: {
      rendered: false // After the component is rendered, exposes a 'rendered' attribute on the element. E.g. <my-element rendered></my-element>
    }
  }
}
```

### reactive

Dynamically creates reactive properties on the element. A change to a reactive property will request a component rerender, if the property is used in either `html` or `css` properties. `reactive` should be an array containing one or more tuples.
In JavaScript tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes up to 3 values. The first 2 are required, the third is optional.

Tuple structure: [`name`, `value`, `exposeAttr?`]

1. **name:** has to be be a `camlCase` string.
2. **value:** can be any value.
3. **exposeAttr:** (optional) not defined or `true`

::: tip
The created property is always the source of truth and not the exposed attribute. So when changing the attribute value, the property will not be updated. But changing the property value will update the attribute.
:::

- **Property**

- **Type:** `readonly [name: string, value: unknown, exposeAttr?: boolean | undefined][]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  reactive = [
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
    console.log(this.aString, this.aBoolean, this.anArray, this.anObject)
  }
}
```

```html
<!-- usage -->
<my-element></my-element>

<!-- an-array attribute will be exposed automatically and look like this: -->
<my-element an-array="[1, 2, 3]"></my-element>
```

### attrs

- **Property**

- **Type:** `readonly [name: string, value?: unknown][]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  attrs = [['text'], ['bg-color', '#000']]

  onReady() {
    console.log(this.text, this.bgColor)
  }
}
```

### observedAttributes

- **Getter**

- **Type:** `string[]`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  static get observedAttributes() {
    return ['text', 'bg-color']
  }

  attrs = [['text'], ['bg-color', '#000']]

  onReady() {
    console.log(this.text, this.bgColor)
  }
}
```

### eventListeners

- **Property**

- **Type:** `readonly [eventTarget: string | MinzeElement | (Window & typeof globalThis) | Document, eventName: string, callback: (event: Event) => void][]`

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
    // do something
  }

  handleCast = () => {
    // do something
  }

  eventListeners = [
    ['.button', 'click', this.handleClick],
    [window, 'minze:my-event-name', this.handleCast],
    [this, 'minze:my-nested-component-event-name', this.handleCast]
  ]
```

### html

Defines the element structure.

- **Property | Method**

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

### css

Defines the scoped styles of an element.

- **Property | Method**

- **Type:** `(): string`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  css = () => `
    :host {
      background: red;
    }
  `
}
```

### rerender

Requests a component rerender. The current template will be compared to the cached template and if they are different, the component will be rerendered. If you want to force-rerender, without any checks, pass `true` as the first argument.

- **Method**

- **Type:** `(force?: boolean | undefined): void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div>Hello Minze!</div>
  `

  onReady = () => {
    this.rerender(true)
  }
}
```

### select

Selects the first matching element for the given `CSS` string selector inside the `html` property.

- **Method**

- **Type:** `(selector: string): Element | null | undefined`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div id="my-div"></div>
    <div></div>
  `

  onReady = () => {
    const element = this.select('#my-div')
    console.log(element)
  }
}
```

### selectAll

Selects all elements matching the given `CSS` string selector inside the `html` property.

- **Method**

- **Type:** `(selector: string): NodeListOf<Element> | undefined`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <div></div>
    <div></div>
  `

  onReady = () => {
    const elements = this.selectAll('div')
    console.log(elements)
  }
}
```

### cast

Dispatches a custom event from the element. Shorthand for `Broadcasting`, not to be confused with `Type casting`.

- **Method**

- **Type:** `(eventName: string, detail?: unknown): void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady = () => {
    const myDetailData = {
      foo: 'bar'
    }

    this.cast('minze:ready', myDetailData)
  }
}
```

### onStart

A Hook which runs after the element is added to the DOM, but before the internal life cycle, like creating reactive properties, or rendering the template. Can either be a regular or async method.

::: tip
This hook runs after the `beforeAttributeChange` and `afterAttributeChange` hooks if any attributes are present on the element.
:::

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onStart = () => {
    console.log('start')
  }
}
```

### onReady

A Hook which runs after the element is added to the DOM and the entire component life cycle is finished. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady = () => {
    console.log('ready')
  }
}
```

### onDestroy

A Hook which runs after the element is disconnected from the document's DOM and all it's eventListeners are removed. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onDestroy = () => {
    console.log('destroyed')
  }
}
```

### onMove

A Hook which runs after the element is moved to a new document but before it's rendered. Can either be a regular or async method.

- **Method**

- **Type:** `(): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onMove = () => {
    console.log('moved')
  }
}
```

### beforeAttributeChange

A Hook which runs before every [observed attribute](#observedattributes) change. Can either be a regular or async method.

- **Method**

- **Type:** `(name?: string | undefined, oldValue?: string | undefined, newValue?: string | undefined): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  beforeAttributeCahnge = (name, oldValue, newValue) => {
    console.log(name, oldValue, newValue)
  }
}
```

### onAttributeChange

A Hook which runs after every [observed attribute](#observedattributes) change. Can either be a regular or async method.

- **Method**

- **Type:** `(name?: string | undefined, oldValue?: string | undefined, newValue?: string | undefined): Promise<void> | void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onAttributeCahnge = (name, oldValue, newValue) => {
    console.log(name, oldValue, newValue)
  }
}
```

<!------- Type Helpers ------->

## Type Helpers

Some properties you can define are from the `tuple` type, but TypeScript doesn't automatically infer tuples and rather asumes that they are arrays. So you have to explicitly declare them as tuples. If you are using `reactive`, `attrs` or `eventListeners`, you can use the following types to do so:

### MinzeProps

Declares `reactive` property as an array of tuples.

- **Type:** `readonly [name: string, value: unknown, exposeAttr?: boolean | undefined][]`

- **Example:**

```ts
import { MinzeElement, MinzeProps } from 'minze'

export interface MyElement {
  foo: string
}

export class MyElement extends MinzeElement {
  reactive: MinzeProps = [[foo, 'bar']]
}
```

### MinzeAttrs

Declares `attrs` property as an array of tuples.

- **Type:** `readonly [name: string, value?: unknown][]`

- **Example:**

```ts
import { MinzeElement, MinzeAttrs } from 'minze'

export interface MyElement {
  foo: string
}

export class MyElement extends MinzeElement {
  attrs: MinzeAttrs = [['foo']]
}
```

### MinzeEvents

Declares `eventListeners` property as an array of tuples.

- **Type:** `readonly [eventTarget: string | MinzeElement | (Window & typeof globalThis) | Document, eventName: string, callback: (event: Event) => void][]`

- **Example:**

```ts
import { MinzeElement, MinzeEvents } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <button class="button">
      Button
    </button>
  `

  handleClick = () => {
    // do something
  }

  eventListeners: MinzeEvents = [['.button', 'click', this.handleClick]]
}
```
