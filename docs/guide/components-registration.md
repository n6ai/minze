# Registration

The quickest way to register a component is to use the `define` method of the respective component.

::: tip
Alternatively, you can register multiple components at once by using the `defineAll` method of the `Minze` class. See the [API Reference](/api/#defineall) for more information.
:::

::: warning
Your component class name has to be either in `PascalCase` or `camelCase` when using this registration method.
:::

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  // ...
}

// automatic naming based on the class name
MyElement.define()

// manual naming
MyElement.define('my-custom-element')
```

<!-- prettier-ignore-start -->
```html
<my-element></my-element>
<my-custom-element></my-custom-element>
```
<!-- prettier-ignore-end -->

**Shorthand Example**

```js
import { MinzeElement } from 'minze'

;(class MyElement extends MinzeElement {
  // ...
}.define())
```

```html
<my-element></my-element>
```
