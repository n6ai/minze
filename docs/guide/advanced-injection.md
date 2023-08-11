# Injection

Sometimes, you want to pass some data from the current component to a nested child element inside the html template. That's where the injection pattern (via attributes) comes in.

**Example**

::: code-group

```js [Parent]
import { MinzeElement } from 'minze'

class MyParent extends MinzeElement {
  reactive = [['data', { active: true, count: 7 }]]

  get inject() {
    return `inject=${JSON.stringify(this.data)}`
  }

  html = () => `
    <my-child ${this.inject}></my-child>
  `
}

MyParent.define()
```

```js [Child]
import { MinzeElement } from 'minze'

class MyChild extends MinzeElement {
  attrs = ['inject']
  static observedAttributes = ['inject']

  onReactive() {
    console.log(this.inject) // {active: true, count: 7}
  }
}

MyChild.define()
```

:::

```html
<my-parent></my-parent>
```
