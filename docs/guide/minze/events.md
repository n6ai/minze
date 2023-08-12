# Events

Abstraction layer for custom events. Useful for listening to events dispatched from custom components. All event listeners created with `Minze` class will be attached to the `window` object.

See the [API reference](/api/minze#events) for more information.

**Example**

::: code-group

```js [./my-element.js]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onReady() {
    this.dispatch('minze:event', { msg: 'Hello Minze!' })
  }
}

MyElement.define()
```

```js [./some-other-file.js]
import Minze from 'minze'

const handleDispatch = (event) => {
  console.log(event.detail) // {msg: 'Hello Minze!'}
  Minze.stopListen('minze:event', handleDispatch)
}

Minze.listen('minze:event', handleDispatch)
```

:::

```html
<my-element></my-element>
```
