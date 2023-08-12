# Minze

Global class with helpful static methods.

## STATIC

### version <Badge type="tip" text="^1.0.0" />

Displays the used version of Minze.

::: code-group

```js [Code]
import { Minze } from 'minze'

console.log(Minze.version) // 1.2.0
```

```ts [Type]
(property) Minze.version: "__VERSION__"
```

:::

### define <Badge type="tip" text="^1.0.0" />

Defines a custom web component. Doesn't throw any errors if the component is already defined.

::: code-group

```js [Code]
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {}

Minze.define('my-element', MyElement)
```

```ts [Type]
(method) Minze.define(name: string, element: typeof MinzeElement): void
```

:::

```html
<my-element></my-element>
```

### defineAll <Badge type="tip" text="^1.0.0" />

Defines all custom web components in a single call. Your components will be registered with `dash-case` naming. The provided components can either be an array of Minze elements, a module object, or a module-map generated with tools like vite's `import.meta.glob` Doesn't throw any errors if a component is already defined.

::: warning
Your component class names should be in `PascalCase` when using this registration method.
:::

::: code-group

```js [Code]
import { Minze, MinzeElement } from 'minze'

class FirstElement extends MinzeElement {}
class SecondElement extends MinzeElement {}

Minze.defineAll([FirstElement, SecondElement])
```

```ts [Type]
(method) Minze.defineAll(elementsOrModules: (typeof MinzeElement)[] | Record<string, unknown | (() => Promise<unknown>)>, filter?: string[] | null, keys?: false | ((key: string) => string) | null): void
```

:::

---

**Examples**

::: code-group

```js [Array]
import { Minze } from 'minze'
import { FirstElement, SecondElement } from './elements.js'

Minze.defineAll([FirstElement, SecondElement])
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
  'first-element': async () => (await import('./element.js')).FirstElement,
  'second-element': async () => (await import('./element.js')).SecondElement,
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

```js [./elements.js]
import { MinzeElement } from 'minze'

export class FirstElement extends MinzeElement {}
export class SecondElement extends MinzeElement {}
```

:::

<!-- prettier-ignore-start -->
```html
<first-element></first-element>
<second-element></second-element>
```
<!-- prettier-ignore-end -->

**Example (Module-Map)**

::: code-group

```txt [Files]
src/
├─ lib/
|  ├─ nested/
|  |  └─ first-element.js
|  └─ second-element.js
└─ main.js
```

<!-- prettier-ignore-start -->
```js [main.js]
import { Minze } from 'minze'

const modules = {
  'lib/nested/first-element.js': () => import('./nested/first-element.js'),
  'lib/second-element.js': () => import('./second-element.js')
}

const filter = ['first-element', 'second-element'] // the elements to define (optional)
const keys = (key) => key.replace(/^lib\/(nested)?|\.js/g, '') // will be applied to every key (optional)

Minze.defineAll(modules, filter, keys)
```
<!-- prettier-ignore-end -->

```js [./nested/first-element.js]
import { MinzeElement } from 'minze'

export class FirstElement extends MinzeElement {}
```

```js [./second-element.js]
import { MinzeElement } from 'minze'

export class SecondElement extends MinzeElement {}
```

:::

## EVENTS

### dispatch <Badge type="tip" text="^1.3.2" />

Dispatches a custom event from the `window` object.

::: code-group

```js [Code]
import { Minze } from 'minze'

Minze.dispatch('minze:event', { msg: 'Hello Minze!' })
```

```ts [Type]
(method) Minze.dispatch(eventName: string, detail?: unknown): void
```

:::

### listen <Badge type="tip" text="^1.0.0" />

Adds an event listener to the `window` object.

::: code-group

```js [Code]
import { Minze } from 'minze'

const callback = (event) => console.log(event.detail) // {msg: 'Hello Minze!'}

Minze.listen('minze:event', callback)
```

```ts [Type]
(method) Minze.listen(eventName: string, callback: (event: Event) => void): void
```

:::

### stopListen <Badge type="tip" text="^1.0.0" />

Remove an event listener from the `window` object.

::: code-group

```js [Code]
import { Minze } from 'minze'

const callback = (event) => console.log(event.detail) // {msg: 'Hello Minze!'}

Minze.stopListen('minze:event', callback)
```

```ts [Type]
(method) Minze.stopListen(eventName: string, callback: (event: Event) => void): void
```

:::

## DEPRECATED

### cast <Badge type="warning" text="deprecated" />

Use [dispatch](/api/minze#dispatch) instead.
