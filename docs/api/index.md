# API Reference

All publicly intended API methods, properties and types are listed below.

<!------- Minze class ------->

## Minze

- **Type:** `class Minze`
- **Example:**

```js
import Minze from 'minze'
import { MyElement } from './my-element'

Minze.defineAll([MyElement])
```

Minze class with multiple static methods for common tasks.

### define

...

### defineAll

...

### cast

...

### listen

...

### stopListen

...

<!------- MinzeElement class ------->

## MinzeElement

- **Type:** `class MinzeElement`
- **Example:**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `<div>Hello Minze!</div>`
}
```

Base class which can be extended from to create web components.

### options

...

### reactive

...

### attrs

...

### observedAttributes

...

### eventListeners

...

### html

...

### css

...

### rerender

...

### select

...

### selectAll

...

### cast

...

### onStart

...

### onReady

...

### onDestroy

...

### onMove

...

### beforeAttributeChange

...

### onAttributeChange

...

## Type Helpers

TypeScript doesn't automatically infer [tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types), so you have to explicitly declare them. If you are using `reactive`, `attrs` or `eventListeners`, you can use the following types to do so:

### MinzeProps

...

### MinzeAttrs

...

### MinzeEvents

...
