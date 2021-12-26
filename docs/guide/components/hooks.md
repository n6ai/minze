# Hooks

Hooks are methods that can be defined within a component and are called at various points in the lifecycle of a component. All hooks can by asynchronous.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  /**
   * Component has been inserted into the DOM,
   * but the internal lifecycle hasn't started yet.
   * If you want to make any API calls before rendering,
   * this is the place.
   *
   * Runs once.
   */
  onStart() {
    console.log('onStart')
  }

  /**
   * The internal lifecycle has finished,
   * and the component is rendered.
   *
   * Runs once.
   */
  onReady() {
    console.log('onReady')
  }

  /**
   * The component is removed from the DOM.
   * All internaly defined event listeners have been removed.
   *
   * Runs once.
   */
  onDestroy() {
    console.log('onDestroy')
  }

  /**
   * The component is moved to a different document.
   * You probably won't need this hook often.
   *
   * Runs once.
   */
  onMove() {
    console.log('onMove')
  }

  /**
   * The template hasn't been rendered yet,
   * but is about to.
   *
   * Can run multiple times.
   */
  beforeRender() {
    console.log('beforeRender')
  }

  /**
   * The template has been rendered.
   *
   * Can run multiple times.
   */
  onRender() {
    console.log('onRender')
  }

  /**
   * An observed attribute has changed,
   * but the attribute property has not yet been updated.
   *
   * Can run multiple times.
   */
  beforeAttributeCahnge() {
    console.log('beforeAttributeCahnge')
  }

  /**
   * An observed attribute has changed,
   * and the attribute property has been updated.
   *
   * Can run multiple times.
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
