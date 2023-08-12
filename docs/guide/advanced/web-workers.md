# Web Workers

[Web Workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers) make it possible to run script operations in background threads, separate from the main execution thread of a web application.

The advantage of this approach is that heavy processing can be offloaded to a separate thread, allowing the main thread (usually the UI) to run without being blocked or slowed down.

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onReactive() {
    const workerJs = `
      onmessage = (e) => {
        const result = e.data.value * 2
        postMessage({ value: result })
      }
    `

    const worker = new Worker(`data:text/javascript;base64,${btoa(workerJs)}`)

    worker.postMessage({ value: 5 })

    worker.onmessage = (e) => {
      console.log(e.data) // 10
    }
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
