# Patterns

A guide for some advanced design patterns that can be used with Minze elements.

## Extending

You can extend from `MinzeElement` and create your own custom base class by adding new properties or methods. And then creating components that inherit from your custom base class.

```js [./base-element.js]
import { MinzeElement } from 'minze'

class BaseElement extends MinzeElement {
  someMethod = () => console.log('Hello from BaseElement')
}

class MyElement extends BaseElement {
  onReady() {
    this.someMethod() // 'Hello from BaseElement'
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```

## Mixins

Mixins are a way to share the same code between multiple components. By creating a separate file and importing it, you can reuse code between components.

::: code-group

```js [./mixins.js]
export const htmlMixin = (text) => `
  <div>Hello ${text}!</div>
`

export const cssMixin = (color) => `
  :host {
    background: ${color};
  }
`
```

```js [./my-element.js]
import { MinzeElement } from 'minze'
import { htmlMixin, cssMixin } from './mixins'

class MyElement extends MinzeElement {
  html = () => htmlMixin('Minze')
  css = () => cssMixin('red')
}

MyElement.define()
```

:::

```html
<my-element></my-element>
```

## Attribute Injection

Sometimes, you want to pass some data from the current component to a nested child element inside the html template. Instead of passing individual attributes you can use the following injection pattern.

::: code-group

```js [Parent]
import { MinzeElement } from 'minze'

class MyParent extends MinzeElement {
  reactive = [['data', { active: true, count: 7 }]]

  get inject() {
    return `inject=${JSON.stringify(this.data)}`
  }

  html = () => `<my-child ${this.inject}></my-child>`
}

MyParent.define()
```

```js [Child]
import { MinzeElement } from 'minze'

class MyChild extends MinzeElement {
  attrs = ['inject']
  static observedAttributes = ['inject']

  onReactive() {
    console.log(this.inject) // {active: true, count: 7}
  }
}

MyChild.define()
```

:::

```html
<my-parent></my-parent>
```

## Browser Storage

You can use the browser `sessionStorage`, `localStorage` or `IndexedDB` for storing and retrieving data.

- **Session Storage:** The stored data is cleared when the session ends.
- **Local Storage:** The stored data is saved across sessions.
- **IndexedDB:** Low-level storage for large amounts of data, persists across sessions.

::: code-group

```js [Session Storage]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    sessionStorage.setItem('minze:store', 'Hello Minze!')
  }

  onReady() {
    const msg = sessionStorage.getItem('minze:store')
    console.log(msg) // 'Hello Minze!'
  }
}

MyElement.define()
```

```js [Local Storage]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    localStorage.setItem('minze:store', 'Hello Minze!')
  }

  onReady() {
    const msg = localStorage.getItem('minze:store')
    console.log(msg) // 'Hello Minze!'
  }
}

MyElement.define()
```

```js [IndexedDB]
// 'idb-keyval' npm package needs to be installed for this example
import { MinzeElement } from 'minze'
import { get, set } from 'idb-keyval'

class MyElement extends MinzeElement {
  async onStart() {
    await set('minze:msg', 'Hello Minze!')
  }

  async onReady() {
    const msg = await get('minze:msg')
    console.log(msg) // 'Hello Minze!'
  }
}

MyElement.define()
```

:::

```html
<my-element></my-element>
```

## Event Bus

A global event bus allows for rather easy cross-component comunication. You can implement one either with a [BroadcastChannel](https://developer.mozilla.org/docs/Web/API/BroadcastChannel) or with events.

### Broadcast

Cross-component comunication via `BroadcastChannel`.

::: code-group

```js [ElementOne]
import { MinzeElement } from 'minze'

const $ = new BroadcastChannel('$')

class ElementOne extends MinzeElement {
  msg = () => $.postMessage('Hello Minze!')
  html = () => `<button on:click="msg">Click me!</button>`
}

ElementOne.define()
```

```js [ElementTwo]
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

### Events

Cross-component comunication via events.

::: code-group

```js [ElementOne]
import { MinzeElement } from 'minze'

class ElementOne extends MinzeElement {
  msg = () => this.dispatch('minze:event', 'Hello Minze!')
  html = () => `<button on:click="msg">Click me!</button>`
}

ElementOne.define()
```

```js [ElementTwo]
import { MinzeElement } from 'minze'

class ElementTwo extends MinzeElement {
  handleEvent = (event) => console.log(event.detail) // 'Hello Minze!'
  eventListeners = [[window, 'minze:event', this.handleEvent]]
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

## Observers

You can use a JavaScript native `MutationObserver` to track DOM changes within a Component.

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    const observer = new MutationObserver((mutations, observer) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          console.log('A child node has been added or removed.')
        } else if (mutation.type === 'attributes') {
          console.log(`The ${mutation.attributeName} attribute was modified.`)
        }
      })
    })

    const options = { attributes: true, childList: true, subtree: true }

    if (this.shadowRoot) observer.observe(this.shadowRoot, options)
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```

## Web Workers

[Web Workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers) make it possible to run script operations in background threads, separate from the main execution thread of a web application.

The advantage of this approach is that heavy processing can be offloaded to a separate thread, allowing the main thread (usually the UI) to run without being blocked or slowed down.

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onReactive() {
    const workerJs = `
      onmessage = (event) => {
        const result = event.data.value * 2
        postMessage({ value: result })
      }
    `

    const worker = new Worker(`data:text/javascript;base64,${btoa(workerJs)}`)

    worker.postMessage({ value: 5 })

    worker.onmessage = (event) => {
      console.log(event.data) // 10
    }
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
