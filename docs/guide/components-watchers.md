# Watchers

`watch` watches the given reactive properties and calls the provided callback whenever a change is detected. `watch` should be an array containing one or more tuples. In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes exactly 2 values.

Tuple structure: [`name`, `callback`]

1. **name:** the reactive property name to watch. Has to be `camelCase`, can be optionally `dash-case` for reactive attributes declared in `attrs`.
2. **callback:** a callback function that runs whenever one of the property's values changes. Can be asynchronous.

::: warning
`watch` only works with reactive properties that were defined with `reactive` or `attrs`.
:::

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  reactive = [['count', 0]]

  watchCount = (newValue, oldValue, key, target) => {
    console.log(newValue, oldValue, key, target) // 1, 0, count, this
  }

  watch = [['count', this.watchCount]]

  onReady() {
    this.count = 1
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```
