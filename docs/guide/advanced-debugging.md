# Debugging

## options

The component logs useful information about itself to the console when the `debug` option inside the component is set to `true`.

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  options = { debug: true } // [!code ++]
}

MyElement.define()
```

```html
<my-element></my-element>
```

## log

You can use `this.log()` anywhere inside the component to log to the console. It's an anhanced version of `console.log()`.

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  key = 'value'

  onReady() {
    this.log(this.key) // [Minze: MyElement] 'value' // [!code ++]
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```

## debugger

The `debugger` statement, invokes any available debugging functionality.

::: warning
The Browser DevTools need to be open for this to work.
:::

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    let value = 1
    debugger // [!code ++]
    value++
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
