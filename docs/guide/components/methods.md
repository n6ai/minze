# Methods

You can define methods on the component to extend its functionality.

::: tip
Certain keywords are reserved for special functionality and shouldn't be overwritten. E.g. `reactive`, `attrs`, etc. See the [API reference](/api/minze-element) for a comprehensive list.
:::

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  myMethod() {
    console.log('Hello Minze!')
  }

  onReady() {
    this.myMethod() // 'Hello Minze!'
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
