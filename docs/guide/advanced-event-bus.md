# Event Bus

You can implement a global event bus for cross-component comunication with `eventListeners` via the global window object.

**Example**

::: code-group

```js [element-one]
import { MinzeElement } from 'minze'

class ElementOne extends MinzeElement {
  run = () => this.dispatch('minze:my-event-name', 'Hello from:')

  html = () => `<button @click=run>Click Me!</button>`

  handleEvent = (event) => {
    console.log(event.detail, this.name) // 'Hello from: ElementOne'
  }

  eventListeners = [[window, 'minze:my-event-name', this.handleEvent]]
}

ElementOne.define()
```

```js [element-two]
import { MinzeElement } from 'minze'

class ElementTwo extends MinzeElement {
  handleEvent = (event) => {
    console.log(event.detail, this.name) // 'Hello from: ElementTwo'
  }

  eventListeners = [[window, 'minze:my-event-name', this.handleEvent]]
}

ElementTwo.define()
```

:::

<!-- prettier-ignore-start -->
```html
<element-one></element-one>
<element-two></element-two>
```
<!-- prettier-ignore-end -->
