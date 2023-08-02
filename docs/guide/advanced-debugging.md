# Debugging

You can debug a MinzeElement in several different ways.

## options

The component logs useful information about itself to the console when the `debug` property inside the component is set to `true`.

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  debug = true // [!code ++]
}

MyElement.define()
```

```html
<my-element></my-element>
```

## console

You can use `console.log()` or `console.dir()` anywhere inside the component to log to the console.

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  key = 'value'

  onReady() {
    console.log(this.key) // [!code ++]
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
