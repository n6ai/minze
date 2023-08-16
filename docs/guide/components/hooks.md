# Hooks

Hooks are methods that can be defined within a component and are called at various points in the lifecycle of a component. Some hooks run only once during the component lifecycle, while others can re-run under certain circumstances. All hooks can be asynchronous. See the [API reference](/api/minze-element#hooks) for more details.

::: code-group

```js [sync]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  onReady() {
    console.log('onReady') // 'onReady'
  }
}

MyElement.define()
```

```js [async]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  async onReady() {
    console.log('onReady') // 'onReady'
  }
}

MyElement.define()
```

:::

```html
<my-element></my-element>
```

## Overview

This overview should help you to decide which of the available hooks to choose for a particular situation.

- **Order:** Execution order of the hook.
- **Common:** This hook always runs during a component lifecycle. Uncommon hooks run under specific circumstances. E.g. `onDestroy` hook runs only when the element is removed from the DOM.
- **Re-runs:** Hook can run more than once during a component lifecycle, before the element is moved or destroyed.
- **Reactive:** If reactive properties can be accessed within the hook.
- **Template:** Hook has access to the **rendered** template when it runs.

`✅ Yes` `❌ No` `❔ depends on execution context`

| Hook                                                                | Order | Common | Re-runs | Reactive | Template |
| ------------------------------------------------------------------- | ----- | ------ | ------- | -------- | -------- |
| [`onStart`](/api/minze-element#onstart)                             | `1`   | ✅     | ❌      | ❌       | ❌       |
| [`onReactive`](/api/minze-element#onreactive)                       | `2`   | ✅     | ❌      | ✅       | ❌       |
| [`beforeRender`](/api/minze-element#beforerender)                   | `3`   | ✅     | ✅      | ✅       | ❌       |
| [`afterRender`](/api/minze-element#afterrender)                     | `4`   | ✅     | ✅      | ✅       | ✅       |
| [`onReady`](/api/minze-element#onready)                             | `5`   | ✅     | ❌      | ✅       | ✅       |
| [`onDestroy`](/api/minze-element#ondestroy)                         | ❔    | ❌     | ❌      | ✅       | ✅       |
| [`onMove`](/api/minze-element#onmove)                               | ❔    | ❌     | ❌      | ✅       | ✅       |
| [`beforeAttributeChange`](/api/minze-element#beforeattributechange) | ❔    | ❌     | ✅      | ❔       | ❔       |
| [`afterAttributeChange`](/api/minze-element#afterattributechange)   | ❔    | ❌     | ✅      | ❔       | ❔       |

## Lifecycle

<p align="center">
  <img class="img-light" src="/hooks.svg">
  <img class="img-dark" src="/hooks-dark.svg">
</p>
