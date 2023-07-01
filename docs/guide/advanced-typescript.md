# TypeScript

This section assumes you already have a basic understanding of TypeScript. The process of writing Minze components in TypeScript is similar to writing them in vanilla JavaScript.

There are two main differences:

1. The types for `reactive`, `attrs`, `watch` and `eventListeners` have to be explicitly declared. You can do so by using [Type Helpers](/api/type-helpers) provided with Minze.
2. Reactive properties and attributes are created dynamically so you have to explicitly declare their types in a separate `interface` named after the component and export it.

By going through and understanding the example below, you will have a firm grasp of how to work with Minze components in TypeScript.

**Example**

```ts
/**
 * We are importing the base MinzeElement class
 * plus some tuple-type helpers.
 */
import type { Reactive, Attrs, Watch, EventListeners } from 'minze'
import { MinzeElement } from 'minze'

/**
 * Since all reactive properties and attribute properties
 * are defined dynamically, we are defining
 * their types separately in an interface.
 *
 * With the exception of undefined, null, false or true
 * all attribute properties will always be strings
 * no matter the initial value.
 */
export interface MyElement {
  // reactive properties
  aBoolean: boolean
  anObject: {
    foo: string
  }
  // reactive attribute properties
  text: string | null
  bgColor: string
}

/**
 * Here we are defining the custom component.
 */
export class MyElement extends MinzeElement {
  /**
   * Reactive properties have to be explicitly defined
   * as a mixed array of strings and tuples.
   * Otherwise, TypeScript will infer them as an array of strings and arrays.
   */
  reactive: Reactive = [
    ['aBoolean', false],
    ['anObject', { foo: 'bar' }]
  ]

  /**
   * Reactive attribute properties have to be explicitly defined
   * as a mixed array of strings and tuples.
   * Otherwise, TypeScript will infer them as an array of strings and arrays.
   */
  attrs: Attrs = ['text', ['bg-color', '#000']]

  /**
   * Here we are defining which attributes should be observed.
   */
  static observedAttributes = ['text', 'bg-color']

  /**
   * Watchers have to be explicitly defined as an array of tuples.
   * Otherwise, TypeScript will infer them as an array of arrays.
   */
  watch: Watch = [['aBoolean', () => {}]]

  /**
   * A click callback handler.
   * We are (broad)casting a custom event on click.
   */
  handleClick = (event: Event) => {
    console.log(event)
    const myDetailData = this.anObject
    this.cast('minze:click', myDetailData)
  }

  /**
   * A (broad)cast callback handler.
   * The event is a CustomEvent so we have to type cast it to such,
   * before accessing the detail data.
   */
  handleCast = (event: Event) => {
    const detail = (event as CustomEvent).detail
    console.log(detail)
  }

  /**
   * eventListeners have to be explicitly defined as an array of tuples.
   * Otherwise, TypeScript will infer them as an array of arrays.
   */
  eventListeners: EventListeners = [
    ['.button', 'click', this.handleClick],
    [this, 'minze:click', this.handleCast]
  ]
}
```

```ts
import { MyElement } from './my-element'
MyElement.define()
```

```html
<my-element></my-element>
```
