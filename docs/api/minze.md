# Minze

Minze class with multiple static methods and properties for common tasks.

## STATIC

### version <Badge type="tip" text="^1.0.0" />

Displays the used version of Minze.

- **Property**

- **Type:** `readonly string`

- **Example:**

```js
import Minze from 'minze'

console.log(Minze.version) // 1.2.0
```

### define <Badge type="tip" text="^1.0.0" />

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

### defineAll <Badge type="tip" text="^1.0.0" />

Defines all custom web components in a single call. Your components will be registered with `dash-case` naming. The provided components can either be an array of Minze Elements, a module object, or a module-map generated with tools like vite's `import.meta.glob`

::: warning
Your component class names should be in `PascalCase` when using this registration method.
:::

- **Method**

- **Type:** `(elementsOrModules: (typeof MinzeElement)[] | Record<string, unknown | (() => Promise<unknown>)>, filter?: string[], mapRE?: RegExp | false | null): void`

- **Example:**

::: code-group

```js [Array]
import { Minze } from 'minze'
import { MyFirstElement, MySecondElement } from './elements.js'

Minze.defineAll([MyFirstElement, MySecondElement])
```

```js [Module]
import { Minze } from 'minze'
import * as elements from './elements.js'

Minze.defineAll(elements)
```

<!-- prettier-ignore-start -->
```js [Module-Map]
import { Minze } from 'minze'
const modules = {
  'my-first-element': async () => (await import('./element.js')).MyFirstElement,
  'my-second-element': async () => (await import('./element.js')).MySecondElement,
  'all': () => import('./element.js')
}

Minze.defineAll(modules)
```
<!-- prettier-ignore-end -->

```js [Module-Map (Vite)]
import { Minze } from 'minze'
const modules = import.meta.glob('./lib/**/*.@(ts|js)')

Minze.defineAll(modules)
```

```js [elements.js]
import { MinzeElement } from 'minze'

export class MyFirstElement extends MinzeElement {
  // ...
}

export class MySecondElement extends MinzeElement {
  // ...
}
```

:::

<!-- prettier-ignore-start -->
```html
<my-first-element></my-first-element>
<my-second-element></my-second-element>
```
<!-- prettier-ignore-end -->

- **Extensive Module-Map Example:**

::: code-group

```txt [Files]
src/
├─ lib/
|  ├─ nested/
|  |  └─ my-first-element.js
|  └─ my-second-element.js
└─ main.js
```

<!-- prettier-ignore-start -->
```js [main.js]
import { Minze } from 'minze'

const modules = {
  'lib/nested/my-first-element.js': () => import('./nested/my-first-element.js'),
  'lib/my-second-element.js': () => import('./my-second-element.js')
}

const filter = ['my-first-element', 'my-second-element'] // the elements to define (optional)
const mapRE = /^lib\/(nested)?|\.js/g // regex matches will be removed from keys (optional)

Minze.defineAll(modules, filter, mapRE)
```
<!-- prettier-ignore-end -->

```js [my-first-element.js]
import { MinzeElement } from 'minze'

export class MyFirstElement extends MinzeElement {
  // ...
}
```

```js [my-second-element.js]
import { MinzeElement } from 'minze'

export class MySecondElement extends MinzeElement {
  // ...
}
```

:::

## EVENTS

### dispatch <Badge type="tip" text="^1.3.2" />

Dispatches a custom event from the `window` object.

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

Minze.dispatch('minze:my-event-name', optionalDetail)
```

### listen <Badge type="tip" text="^1.0.0" />

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

### stopListen <Badge type="tip" text="^1.0.0" />

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

## DEPRECATED

### cast <Badge type="warning" text="deprecated" />

Use [dispatch](/api/minze#dispatch) instead.
