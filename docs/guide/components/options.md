# Options

Individual components can be customized by declaring an options property. See all currently available options in the [API reference](/api/minze-element#options).

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  options = {
    // ...
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
