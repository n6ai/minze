# Registration

The quickest way to register a component is to use the `define` method of the respective component.

::: tip
Alternatively, you can register multiple components at once by using the `defineAll` method of the `Minze` class. See the [API reference](/api/minze#defineall) for more information.
:::

::: warning
Your component class name should be in `PascalCase` when using this registration method.
:::

::: code-group

```js [Regular]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  // ...
}

MyElement.define() // automatic naming based on the class name
MyElement.define('my-custom-element') // manual naming
```

<!-- prettier-ignore-start -->
```js [Shorthand]
import { MinzeElement } from 'minze'

;(class MyElement extends MinzeElement {
  // ...
}).define()
```
<!-- prettier-ignore-end -->

:::

<!-- prettier-ignore-start -->
```html
<my-element></my-element>
<my-custom-element></my-custom-element>
```
<!-- prettier-ignore-end -->
