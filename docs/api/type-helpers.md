# Type Helpers

The properties `reactive`, `attrs`, `watch` and `eventListeners` are from the `tuple` type, but TypeScript doesn't automatically infer tuples and rather assumes that they are arrays. So you have to explicitly declare them as tuples. You can use the following types to do so:

## Reactive <Badge text="^1.0.0" />

Declares `reactive` property as a mixed array of strings and tuples.

::: code-group

```ts [Code]
import { MinzeElement, type Reactive } from 'minze'

export interface MyElement {
  count: number
}

export class MyElement extends MinzeElement {
  reactive: Reactive = [['count', 0]]
}
```

```ts [Type]
type Prop = string | [name: string, value: unknown, exposeAttr?: boolean]
type Reactive = readonly Prop[]
```

:::

## Attrs <Badge text="^1.0.0" />

Declares `attrs` property as a mixed array of strings and tuples.

::: code-group

```ts [Code]
import { MinzeElement, type Attrs } from 'minze'

export interface MyElement {
  count: number
}

export class MyElement extends MinzeElement {
  attrs: Attrs = [['count', 0]]
}
```

```ts [Type]
type Attr = string | [name: string, value?: unknown]
type Attrs = readonly Attr[]
```

:::

## Watch <Badge text="^1.0.0" />

Declares `watch` property as an array of tuples.

::: code-group

```ts [Code]
import { MinzeElement, type Watch } from 'minze'

export interface MyElement {
  count: number
}

export class MyElement extends MinzeElement {
  watch: Watch = [
    ['count', (newValue, oldValue) => console.log(newValue, oldValue)]
  ]
}
```

```ts [Type]
type Callback = (
  newValue?: any,
  oldValue?: any,
  key?: string,
  target?: object | typeof MinzeElement
) => Promise<void> | void

type Watch = readonly [name: string, callback: Callback][]
```

:::

## EventListeners <Badge text="^1.0.0" />

Declares `eventListeners` property as an array of tuples.

::: code-group

```ts [Code]
import { MinzeElement, type EventListeners } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `<button>Click me!</button>`

  handleClick = (event: Event) => {}

  eventListeners: EventListeners = [['.button', 'click', this.handleClick]]
}
```

```ts [Type]
type EventListener = [
  eventTarget: string | MinzeElement | typeof Window | BroadcastChannel,
  eventName: string,
  callback: (event: any) => void
]

type EventListeners = EventListener[]
```
