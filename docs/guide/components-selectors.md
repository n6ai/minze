# Selectors

You can use selectors to select elements within the components `html` template (shadow DOM) by providing a valid `CSS` selector.

- `select` - Selects the first element that matches the selector.
- `selectAll` - Selects all elements that match the selector.

::: warning
When using selectors with Hooks, keep in mind that the template might not be yet rendered during certain Hooks like `onStart` and `onReactive`.
:::

**Example**

```js
import Minze, { MinzeElement } from 'minze'

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

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```
