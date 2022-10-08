# Options

Individual components can be customized by declaring an options property. See all currently available options in the [API Reference](/api/minze-element.html#options).

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  options = {
    exposeAttrs: {
      rendered: true
    }
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```
