# Debugging

## Options

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

## debugger

The `debugger` statement, invokes any available debugging functionality.

::: warning
Browser DevTools needs to be open for this to work.
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
