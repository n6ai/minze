# Extending

You can extend from `MinzeElement` and create your own custom base classes by adding properties or methods. And then creating components that inherit from your custom base class.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyBaseElement extends MinzeElement {
  someMethod() {
    console.log('Hello from MyBaseElement')
  }
}

class MyElement extends MyBaseElement {
  onReady() {
    this.someMethod() // Hello from MyBaseElement
  }
}

class MyElementTwo extends MyBaseElement {
  someMethod() {
    super.someMethod()
    // ...
  }

  onReady() {
    this.someMethod() // Hello from MyBaseElement
  }
}

Minze.defineAll([MyElement, MyElementTwo])
```

<!-- prettier-ignore-start -->
```html
<my-element></my-element>
<my-element-two></my-element-two>
```
<!-- prettier-ignore-end -->
