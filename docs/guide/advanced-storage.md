# Storage

You can use the JavaScript native `sessionStorage` or `localStorage` properties for accessing the Storage object.

## Session Storage

The stored data is cleared when the page session ends.

**Example**

```js
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    sessionStorage.setItem('minze:msg', 'Helo Minze!')
  }

  onReady() {
    const msg = sessionStorage.getItem('minze:msg')
    console.log(msg) // Helo Minze!
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

## Local Storage

The stored data is saved across browser sessions.

**Example**

```js
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    localStorage.setItem('minze:msg', 'Helo Minze!')
  }

  onReady() {
    const msg = localStorage.getItem('minze:msg')
    console.log(msg) // Helo Minze!
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```
