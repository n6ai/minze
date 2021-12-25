# API Reference

All publicly intended API methods, properties and types are listed below.

<!------- Minze class ------->

## Minze

Minze class with multiple static methods for common tasks.

### define

Defines a custom web component.

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
Your component class names must be in either `PascalCase` or `camelCase` when using this registration method.
:::

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

...

### reactive

...

### attrs

...

### observedAttributes

...

### eventListeners

...

### html

...

### css

...

### rerender

...

### select

...

### selectAll

...

### cast

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

...

### onReady

...

### onDestroy

...

### onMove

...

### beforeAttributeChange

...

### onAttributeChange

...

## Type Helpers

Some properties you can define are from the `tuple` type, but TypeScript doesn't automatically infer tuples and rather asumes that they are arrays. So you have to explicitly declare them as tuples. If you are using `reactive`, `attrs` or `eventListeners`, you can use the following types to do so:

### MinzeProps

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

  clickHandler = () => {
    // do something
  }

  eventListeners: MinzeEvents = [['.button', 'click', this.clickHandler]]
}
```
