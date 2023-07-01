# Minze

Minze class with multiple static methods and properties for common tasks.

## version

Displays the used version of Minze.

- **Property**

- **Type:** `readonly string`

- **Example:**

```js
import Minze from 'minze'

console.log(Minze.version) // 1.2.0
```

## define

Defines a custom web component.

- **Method**

- **Type:** `(name: string, element: typeof MinzeElement): void`

- **Example:**

```js
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  // ...
}

Minze.define('my-element', MyElement)
```

```html
<my-element></my-element>
```

## defineAll

Defines all custom web components in a single call. Your components will be registered with `dash-case` naming.

::: warning
Your component class names have to be either in `PascalCase` or `camelCase` when using this registration method.
:::

- **Method**

- **Type:** `(elements: (typeof MinzeElement)[] | Record<string, typeof MinzeElement | (() => Promise<Record<string, typeof MinzeElement>>)>): void`

- **Example:**

```js
import { Minze, MinzeElement } from 'minze'

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

- **Modules Example:**

```js
// elements.js
import { MinzeElement } from 'minze'

export class MyFirstElement extends MinzeElement {
  // ...
}

export class MySecondElement extends MinzeElement {
  // ...
}
```

```js
import { Minze } from 'minze'
import * as Elements from './elements'

Minze.defineAll(Elements)
```

<!-- prettier-ignore-start -->
```html
<my-first-element></my-first-element>
<my-second-element></my-second-element>
```
<!-- prettier-ignore-end -->

## cast

Dispatches a custom event from the `window` object. Shorthand for `Broadcasting`, not to be confused with `Type casting`.

::: tip
It's a good idea to prefix your custom event names to avoid collisions with other libraries.
:::

- **Method**

- **Type:** `(eventName: string, detail?: unknown): void`

- **Example:**

```js
import Minze from 'minze'

const optionalDetail = {
  msg: 'Hello Minze!'
}

Minze.cast('minze:my-event-name', optionalDetail)
```

## listen

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

## stopListen

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
