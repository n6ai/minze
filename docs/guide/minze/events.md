# Events

The Minze class has an abstraction layer for custom events, which can be invoked by calling its static methods. This can be useful for listening to events dispatched from custom components. All event listeners created by `Minzes` static methods will be attached to the `window` object.

See the [API reference](/api/minze.html#dispatch) for more information.

**Example**

```js
// some component
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onReady() {
    this.dispatch('minze:ready')
  }
}

MyElement.define()
```

```js
// some other js file
import Minze from 'minze'

const handleDispatch = (event) => {
  console.log('ready!')
  Minze.stopListen('minze:ready', handleDispatch)
}

Minze.listen('minze:ready', handleDispatch)
```

```html
<my-element></my-element>
```
