# Element Examples

Below you can find some advanced examples on how to create certain element functionality with Minze.

::: tip
Check out the [Creating Native Web Components](https://tympanus.net/codrops/2022/03/04/creating-native-web-components/) article on codrops for a tutorial with practical examples about how to create native web components with Minze.
:::

## Link

Recreating some basic functionality of the `<a></a>` link element with Minze.

**Example**

```js
import { MinzeElement } from 'minze'

class CustomLink extends MinzeElement {
  attrs = ['href', 'target']

  css = () => `
    :host {
      display: inline-block;
    }

    :host(:hover) {
      cursor: pointer;
      text-decoration: underline;
    }
  `

  handleClick = () => {
    if (this.target && this.href) window.open(this.href, this.target)
    else if (this.href) location.href = this.href
  }

  eventListeners = [[this, 'click', this.handleClick]]
}

CustomLink.define()
```

<!-- prettier-start-ignore -->

```html
<custom-link href="https://google.com" target="_blank">
  Hello Minze!
</custom-link>
```

<!-- prettier-end-ignore -->

## Input Wrapper

Creating a wrapper element around the `<input />` element with Minze.

**Example**

```js
import { MinzeElement } from 'minze'

class CustomInput extends MinzeElement {
  reactive = [['value', '', true]]

  attrs = ['placeholder', 'type', 'name']

  static observedAttributes = ['placeholder', 'type', 'name']

  html = () => `
    <input
      ${this.attrs
        .map((attr) => (this[attr] ? `${attr}="${this[attr]}"` : ''))
        .join(' ')}
      value="${this.value}"
    />
  `

  handleInput = (event) => {
    this.value = event.target.value
  }

  eventListeners = [['input', 'keyup', this.handleInput]]
}

CustomInput.define()
```

<!-- prettier-start-ignore -->

```html
<custom-input
  placeholder="Placeholder"
  type="text"
  name="my-input"
></custom-input>
```

<!-- prettier-end-ignore -->

## Persistent Storage

Implementing persistent storage inside a Minze Element with Local Storage.

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  reactive = [['count', 0]]

  watchCount = (newValue) => {
    localStorage.setItem('count', String(newValue))
  }

  watch = [['count', this.watchCount]]

  html = () => `
    <button>
      Count: ${this.count}
    </button>
  `

  onReactive() {
    const count = localStorage.getItem('count')
    if (count) this.count = Number(count)
  }

  handleClick = () => {
    this.count++
  }

  eventListeners = [['button', 'click', this.handleClick]]
}

MyElement.define()
```

```html
<my-element></my-element>
```
