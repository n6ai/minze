# Form Input Bindings

Here's an example of how to get and set the value of an input element.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <input type="text" id="input" />
  `

  get inputValue() {
    return this.select('#input').value
  }

  set inputValue(value) {
    this.select('#input').value = value
  }

  onReady() {
    this.inputValue = 'Hello Minze'
  }

  handleInput = () => {
    console.log(this.inputValue)
  }

  eventListeners = [['#input', 'keyup', this.handleInput]]
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```
