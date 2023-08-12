# Event Bus

You can implement a global event bus for cross-component comunication either with a [BroadcastChannel](https://developer.mozilla.org/docs/Web/API/BroadcastChannel) or with Events.

## Broadcasting

Cross-component comunication via BroadcastChannel.

::: code-group

```js [element-one]
import { MinzeElement } from 'minze'

const $ = new BroadcastChannel('$')

class ElementOne extends MinzeElement {
  msg = () => $.postMessage('Hello Minze!')
  html = () => `<button @click="msg">Click me!</button>`
}

ElementOne.define()
```

```js [element-two]
import { MinzeElement } from 'minze'

const $ = new BroadcastChannel('$')

class ElementTwo extends MinzeElement {
  handleMessage = (event) => console.log(event.data) // 'Hello Minze!'
  eventListeners = [[$, 'message', this.handleMessage]]
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

## Events

Cross-component comunication via Events.

**Example**

::: code-group

```js [element-one]
import { MinzeElement } from 'minze'

class ElementOne extends MinzeElement {
  msg = () => this.dispatch('msg', 'Hello Minze!')
  html = () => `<button @click="msg">Click me!</button>`
}

ElementOne.define()
```

```js [element-two]
import { MinzeElement } from 'minze'

class ElementTwo extends MinzeElement {
  handleEvent = (event) => console.log(event.detail) // 'Hello Minze!'
  eventListeners = [[window, 'msg', this.handleEvent]]
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
