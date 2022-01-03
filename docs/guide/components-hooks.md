# Hooks

Hooks are methods that can be defined within a component and are called at various points in the lifecycle of a component. All hooks can be asynchronous.

**Run only once:**

- `onStart`
- `onReactive`
- `onReady`
- `onDestroy`
- `onMove`

**Can run multiple times:**

- `beforeRender`
- `onRender`
- `beforeAttributeChange`
- `onAttributeChange`

## Lifecycle

<p align="center">
  <img src="/hooks.svg">
</p>

## Example

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  /**
   * Component has been inserted into the DOM,
   * but the internal lifecycle hasn't started yet.
   *
   * Runs once.
   */
  onStart() {
    console.log('onStart')
  }

  /**
   * Reactive properties have been initialized.
   *
   * Runs once.
   */
  onReactive() {
    console.log('onReactive')
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
   * All internally defined event listeners have been removed.
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
   * The template hasn't been rendered yet
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
  beforeAttributeChange() {
    console.log('beforeAttributeChange')
  }

  /**
   * An observed attribute has changed,
   * and the attribute property has been updated.
   *
   * Can run multiple times.
   */
  onAttributeChange() {
    console.log('onAttributeChange')
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```
