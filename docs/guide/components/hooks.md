# Hooks

Hooks are methods that can be defined within a component and are called at various points in the life cycle of a component. All hooks can by asynchronous.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  /**
   * Component has been inserted into the DOM,
   * but the internal life cycle hasn't started yet.
   * If you want to make any API calls before rendering,
   * this is the place.
   */
  onStart() {
    console.log('onStart')
  }

  /**
   * The internal life cycle has finished,
   * and the component is rendered.
   */
  onReady() {
    console.log('onReady')
  }

  /**
   * The component is removed from the DOM.
   * All internaly defined event listeners have been removed.
   */
  onDestroy() {
    console.log('onDestroy')
  }

  /**
   * The component is moved to a different document.
   * You probably won't need this hook often.
   */
  onMove() {
    console.log('onMove')
  }

  /**
   * An observed attribute has changed,
   * but the attribute property has not yet been updated.
   */
  beforeAttributeCahnge() {
    console.log('beforeAttributeCahnge')
  }

  /**
   * An observed attribute has changed,
   * and the attribute property has been updated.
   */
  onAttributeCahnge() {
    console.log('onAttributeCahnge')
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```
