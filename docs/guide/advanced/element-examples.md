# Element Examples

Below you can find some advanced examples on how to create certain element functionality with Minze.

::: tip
Check out the [Creating Native Web Components](https://tympanus.net/codrops/2022/03/04/creating-native-web-components/) article on codrops for a tutorial with practical examples about how to create native web components with Minze.
:::

## Link

Recreating some basic functionality of the `<a></a>` link element with Minze.

```js
import { MinzeElement } from 'minze'

class CustomLink extends MinzeElement {
  attrs = ['href', 'target']
  static observedAttributes = ['href', 'target']

  onStart() {
    this.role = 'link'
    this.tabIndex = 0
  }

  css = () => `
    :host {
      display: inline-block;
    }

    :host(:hover) {
      cursor: pointer;
      text-decoration: underline;
    }
  `

  open = (event) => {
    const keys = ['Enter', 'Spacebar', ' ']

    if ((this.href && event.type === 'click') || keys.includes(event.key)) {
      window.open(this.href, this.target ?? '_self')
    }
  }

  eventListeners = [
    [this, 'click', this.open],
    [this, 'keydown', this.open]
  ]
}

CustomLink.define()
```

<!-- prettier-start-ignore -->

```html
<custom-link href="https://minze.dev" target="_blank">
  Hello Minze!
</custom-link>
```

<!-- prettier-end-ignore -->

## Persistent Storage

Implementing persistent storage inside a Minze Element with Local Storage.

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  reactive = [['count', 0]]

  increaseCount = () => this.count++

  watch = [
    [
      'count',
      (newValue) => {
        localStorage.setItem('count', String(newValue))
      }
    ]
  ]

  html = () => `
    <button @click="increaseCount">
      Count: ${this.count}
    </button>
  `

  onReactive() {
    const count = localStorage.getItem('count')
    if (count) this.count = Number(count)
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
