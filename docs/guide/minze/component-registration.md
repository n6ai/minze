# Component Registration

You can register components in two different ways: one by one or all at once.

::: tip
Custom component names should always consist of at least two words.
:::

## define

Define a single component by providing a name and a component class.

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

## defineAll

Define multiple components at once. They will be automatically defined in `dash-case` format.

::: warning
Your component class names have to be either in PascalCase or camelCase when using this registration method.
:::

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

```html
<my-first-element></my-first-element> <my-second-element></my-second-element>
```
