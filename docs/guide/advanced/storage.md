# Storage

You can use the JavaScript native `sessionStorage` or `localStorage` properties for accessing the Storage object.

## Session Storage

The stored data is cleared when the page session ends.

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    sessionStorage.setItem('minze:msg', 'Hello Minze!')
  }

  onReady() {
    const msg = sessionStorage.getItem('minze:msg')
    console.log(msg) // Hello Minze!
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```

## Local Storage

The stored data is saved across browser sessions.

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onStart() {
    localStorage.setItem('minze:msg', 'Hello Minze!')
  }

  onReady() {
    const msg = localStorage.getItem('minze:msg')
    console.log(msg) // Hello Minze!
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
