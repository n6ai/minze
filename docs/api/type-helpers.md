# Type Helpers

Some properties you can define are from the `tuple` type, but TypeScript doesn't automatically infer tuples and rather assumes that they are arrays. So you have to explicitly declare them as tuples. If you are using `reactive`, `attrs`, `watch` or `eventListeners`, you can use the following types to do so:

## Reactive

Declares `reactive` property as a mixed array of strings and tuples.

- **Type:** `readonly (string | [name: string, value: unknown, exposeAttr?: boolean])[]`

- **Alias:** `MinzeReactive`

- **Example:**

```ts
import { MinzeElement, Reactive } from 'minze'

export interface MyElement {
  foo: null
  count: number
}

export class MyElement extends MinzeElement {
  reactive: Reactive = ['foo', ['count', 0]]
}
```

## Attrs

Declares `attrs` property as a mixed array of strings and tuples.

- **Type:** `readonly (string | [name: string, value?: unknown])[]`

- **Alias:** `MinzeAttrs`

- **Example:**

```ts
import { MinzeElement, Attrs } from 'minze'

export interface MyElement {
  foo: null
  count: string
}

export class MyElement extends MinzeElement {
  attrs: Attrs = ['foo', ['count', 0]]
}
```

## Watch

Declares `watch` property as an array of tuples.

- **Type:** `readonly [name: string, callback: (newValue?: any, oldValue?: any, key?: string, target?: object | typeof MinzeElement) => Promise<void> | void][]`

- **Alias:** `MinzeWatch`

- **Example:**

```ts
import { MinzeElement, Watch } from 'minze'

export class MyElement extends MinzeElement {
  watchCount = (
    newValue: any,
    oldValue: any,
    key: string,
    target: object | typeof MinzeElement
  ) => {
    console.log(newValue, oldValue, key, target)
  }

  watch: Watch = [['count', this.watchCount]]
}
```

## EventListeners

Declares `eventListeners` property as an array of tuples.

- **Type:** `readonly [eventTarget: string | MinzeElement | typeof Window, eventName: string, callback: (event: Event) => void][]`

- **Alias:** `MinzeEventListeners`

- **Example:**

```ts
import { MinzeElement, EventListeners } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <button class="button">
      Button
    </button>
  `

  handleClick = (event: Event) => {
    console.log(event)
  }

  eventListeners: EventListeners = [['.button', 'click', this.handleClick]]
}
```