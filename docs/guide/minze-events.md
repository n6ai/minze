# Events

The Minze class has an abstraction layer for custom events, which can be invoked by calling its static methods. This can be useful for listening to events casted from custom components. All event listeners created by `Minzes` static methods will be attached to the `window` object.

See the [API Reference](/api/#cast) for more information.

**Example**

```js
// some component
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onReady() {
    this.cast('minze:ready')
  }
}

Minze.defineAll([MyElement])
```

```js
// some other js file
import Minze from 'minze'

const handleCast = (event) => {
  console.log('ready!')
  Minze.stopListen('minze:ready', handleCast)
}

Minze.listen('minze:ready', handleCast)
```

```html
<my-element></my-element>
```
