# TypeScript

This section assumes you already have a basic understanding of [TypeScript](https://www.typescriptlang.org). The process of writing Minze components in TypeScript is similar to writing them in vanilla JavaScript.

There are two main differences:

1. The types for `reactive`, `attrs`, `watch` and `eventListeners` have to be explicitly declared. You can do so by using [Type Helpers](/api/type-helpers) provided with Minze.
2. Reactive properties and attributes are created dynamically so you have to explicitly declare their types in a separate `interface` named after the component and export it.

::: warning
If you are using [typescript-eslint](https://typescript-eslint.io) with Minze, you have to disable the `@typescript-eslint/no-unsafe-declaration-merging` rule.
:::

::: code-group

<!-- prettier-ignore-start -->
```ts [Reactive]
import { type Reactive } from 'minze' // [!code focus]
import { MinzeElement } from 'minze'

export interface MyElement { // [!code focus]
  aBoolean: boolean // [!code focus]
  anObject: { foo: string } // [!code focus]
} // [!code focus]

export class MyElement extends MinzeElement {
  reactive: Reactive = [ // [!code focus]
    ['aBoolean', false],
    ['anObject', { foo: 'bar' }]
  ]
}
```
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
```ts [Attrs]
import type { Attrs } from 'minze' // [!code focus]
import { MinzeElement } from 'minze'

export interface MyElement { // [!code focus]
  text: string | null // [!code focus]
  bgColor: string // [!code focus]
  config: Record<string, string> // [!code focus]
} // [!code focus]

export class MyElement extends MinzeElement {
  attrs: Attrs = [ // [!code focus]
    'text',
    ['bg-color', '#000'],
    ['config', { key1: 'value', key2: 'value' }]
  ]

  static observedAttributes = ['text', 'bg-color', 'config']
}
```
<!-- prettier-ignore-end -->

```ts [Watch]
import type { Watch } from 'minze' // [!code focus]
import { MinzeElement, type Watch } from 'minze'

export class MyElement extends MinzeElement {
  watch: Watch = [['aBoolean', () => {}]] // [!code focus]
}
```

<!-- prettier-ignore-start -->
```ts [EventListeners]
import type { EventListeners } from 'minze' // [!code focus]
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `<button class="button">Click me!</button>`

  handleClick = (event: Event) => {
    console.log(event.target) // <button class="button">Click me!</button>
  }

  eventListeners: EventListeners = [ // [!code focus]
    ['.button', 'click', this.handleClick]
  ]
}
```
<!-- prettier-ignore-end -->

```ts [./main.ts]
import { MyElement } from './my-element'
MyElement.define()
```

:::

```html
<my-element></my-element>
```
