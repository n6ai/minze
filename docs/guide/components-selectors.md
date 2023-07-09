# Selectors

You can use selectors to select elements within the components `html` template (shadow DOM) by providing a valid `CSS` selector.

- `select` - Selects the first element that matches the selector.
- `selectAll` - Selects all elements that match the selector.

::: warning
When using selectors with Hooks, keep in mind that the template might not be yet rendered during certain Hooks like `onStart` and `onReactive`.
:::

::: warning
`this.select` and `this.selectAll` select elements inside the initial `html` template, if you want to select slotted elements use the JavaScript native `this.querySelector` and `this.querySelectorAll` methods instead.
:::

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <div id="my-div"></div>
    <div></div>
  `

  onReady() {
    const element = this.select('#my-div')
    const elements = this.selectAll('div')
    console.log(element, elements)
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
