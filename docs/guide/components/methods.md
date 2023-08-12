# Methods

You can define regular methods on the component to extend its functionality.

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  myMethod() {
    console.log('Hello Minze!')
  }

  onReady() {
    this.myMethod()
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
