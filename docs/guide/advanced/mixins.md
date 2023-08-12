# Mixins

Mixins are a way to share the same code between multiple components. By creating a separate file and importing it, you can reuse code between components.

**Example**

```js
// mixins.js
export const htmlMixin = (text) => `
  <div>Hello ${text}!</div>
`

export const cssMixin = (color) => `
  :host {
    background: ${color};
  }
`
```

```js
import { MinzeElement } from 'minze'
import { htmlMixin, cssMixin } from './mixins'

class MyElement extends MinzeElement {
  html = () => htmlMixin('Minze')
  css = () => cssMixin('red')
}

MyElement.define()
```

```html
<my-element></my-element>
```
