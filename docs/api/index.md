# API Reference

All publicly intended API methods, properties and types are listed below.

<!------- Minze class ------->

## Minze

Minze class with multiple static methods for common tasks.

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

class MyElement extends MinzeElement {
  // ...
}

class MySecondElement extends MinzeElement {
  // ...
}

Minze.defineAll([MyElement, MySecondElement])
```

```html
<my-element></my-element> <my-second-element></my-second-element>
```

### cast

Dispatches a custom event from the `window` object.

- **Method**

- **Type:** `(eventName: string, detail?: unknown): void`

- **Example:**

```js
import Minze from 'minze'

const myData = {
  foo: 'bar'
}

Minze.cast('minze:my-event-name', myData)
```

### listen

Adds an event listener to the `window` object.

- **Method**

- **Type:** `(eventName: string, callback: (event: Event) => void): void`

- **Example:**

```js
import Minze from 'minze'

const callback = (event) => {
  if (event.type === 'minze:my-event-name') {
    // do something
  }
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

const callback = () => {
  // do something
}

Minze.stopListen('minze:my-event-name', callback)
```

<!------- MinzeElement class ------->

## MinzeElement

Base class which can be extended from to create custom web components.

### options

Indevidual components can be customized by declaring an options property. All currently available options are listed in the example below.

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

- **Method**

- **Type:** `(eventName: string, detail?: unknown): void`

- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady = () => {
    const myData = {
      foo: 'bar'
    }

    this.cast('minze:ready', myData)
  }
}
```

### onStart

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
