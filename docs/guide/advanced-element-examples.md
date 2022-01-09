# Element Examples

Below you can find some advanced examples on how to create certain element functionality with Minze.

## Link

Recreating some basic functionality of the `<a></a>` link element with Minze.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

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

Minze.defineAll([CustomLink])
```

<!-- prettier-start-ignore -->

```html
<custom-link href="https://google.com" target="_blank"> Hi there! </custom-link>
```

<!-- prettier-end-ignore -->

## Input Wrapper

Creating a wrapper element around the `<input />` element with Minze.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class CustomInput extends MinzeElement {
  reactive = [
    ['value', '', true],
    ['firstRender', true]
  ]

  attrs = ['placeholder', 'type', 'name']

  html = () => `
    <input
      ${this.attrs.map((attr) => `${attr}="${this[attr]}"`).join(' ')}
      ${this.value ? `value="${this.value}"` : ''}
    />
  `

  onRender() {
    if (!this.firstRender) {
      // refocus the input and set the cursor to the end
      const input = this.select('input')
      input.focus()
      input.value = ''
      input.value = this.value
    }

    this.firstRender = false
  }

  handleInput = (event) => {
    this.value = event.target.value
  }

  eventListeners = [['input', 'keyup', this.handleInput]]
}

Minze.defineAll([CustomInput])
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
