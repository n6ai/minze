# Selectors

You can use selector methods to select elements within the componets `html` template (shadow DOM) by providing a valid `CSS` selector.

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
