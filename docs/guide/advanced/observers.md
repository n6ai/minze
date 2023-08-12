# Observers

You can use a JavaScript native `MutationObserver` to track DOM changes within a Component.

**Example**

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
