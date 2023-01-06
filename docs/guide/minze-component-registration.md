# Component Registration

You can register components in two different ways: one by one or all at once.

## define

Define a single component by providing a name and a component class.

::: tip
Alternatively, you can define components by calling their respective `define` method. See the [API Reference](/api/minze.html#define) for more information.
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

Define multiple components at once. They will be automatically defined in `dash-case` format.

::: warning
Your component class names have to be either in `PascalCase` or `camelCase` when using this registration method.
:::

```js
import { Minze, MinzeElement } from 'minze'

class MyFirstElement extends MinzeElement {
  html = () => `<div>my first element</div>`
}

class MySecondElement extends MinzeElement {
  html = () => `<div>my second element</div>`
}

Minze.defineAll([MyFirstElement, MySecondElement])
```

<!-- prettier-ignore-start -->
```html
<my-first-element></my-first-element>
<my-second-element></my-second-element>
```
<!-- prettier-ignore-end -->

**Modules**

If you are using modules you can register all exported components at once:

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
import * as Elements from './elements'

Minze.defineAll(Elements)
```

<!-- prettier-ignore-start -->
```html
<my-first-element></my-first-element>
<my-second-element></my-second-element>
```
<!-- prettier-ignore-end -->
