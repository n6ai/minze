# Methods

You can define methods on the component to extend its functionality.

::: tip
Certain keywords are reserved for special functionality and shouldn't be overwritten. E.g. `reactive`, `attrs`, etc. See the [API reference](/api/minze-element) for a comprehensive list.
:::

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  firstMethod() {
    console.log('Hello Minze!')
  }

  secondMethod = () => {
    console.log('Hello Minze again!')
  }

  onReady = () => {
    this.firstMethod() // 'Hello Minze!'
    this.secondMethod() // 'Hello Minze again!'
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
