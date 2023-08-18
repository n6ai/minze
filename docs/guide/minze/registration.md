# Registration

You can register components in two different ways: one by one or all at once.

## define

Define a single component by providing a name and a component class.

::: tip
Alternatively, you can define components by calling their respective `define` method. See the [API reference](/api/minze-element#define) for more information.
:::

::: tip
You can also import the main `Minze` class as a default import: <br> `import Minze, { MinzeElement } from 'minze'`
:::

::: warning
Custom component names should always consist of at least two words.
:::

```js
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `<div>my element</div>`
}

Minze.define('my-element', MyElement)
```

```html
<my-element></my-element>
```

## defineAll

Define multiple components at once. They will be automatically defined in `dash-case` format. The provided components can either be an array of Minze elements, a module object, or a module-map generated with tools like vite's `import.meta.glob`

::: warning
Your component class names should be in `PascalCase` when using this registration method.
:::

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

::: tip
If you are using the module-map registration method, you can specify which components should be registered by providing an array of keys as the second argument. E.g. `Minze.defineAll(modules, ['first-element'])`
:::
