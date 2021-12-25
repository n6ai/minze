# TypeScript

This sections assumes you already have a basic understanding of TypeScript. The process of writing Minze components in TypeScript is similar to writing them in vanilla JavaScript.

There are some small differences, like using [Type Helpers](/api/#type-helpers) and defining types for dynamic properties.

By going through and understanding the example below, you will have a firm grasp on how to work with Minze components in TypeScript.

**Example**

```ts
/**
 * We are importing the base MinzeElement class
 * plus some tuple type helpers.
 */
import { MinzeElement, MinzeProps, MinzeAttrs, MinzeEvents } from 'minze'

/**
 * Since all properties and attribute properties
 * are defined dynamically, we are defining
 * their types seperatly in an interface.
 *
 * Attribute properties will always be strings
 * no matter the initial value.
 */
export interface MeElement {
  aBoolean: boolean
  anObject: {
    foo: string
  }
  text: string
  bgColor: string
}

/**
 * Here we are defining the custom component.
 */
export class MyElement extends MinzeElement {
  /**
   * Reactive properties have to be explicitly defined as an array of tuples.
   * Otherwise, TypeScript will infer them as an array of arrays.
   */
  reactive: MinzeProps = [
    ['aBoolean', false],
    ['anObject', { foo: 'bar' }]
  ]

  /**
   * Reactive attribute properties have to be explicitly defined as an array of tuples.
   * Otherwise, TypeScript will infer them as an array of arrays.
   */
  attrs: MinzeAttrs = [['text'], ['bg-color', '#000']]

  /**
   * Here we are defining which attributes should be observed.
   */
  static get observedAttributes() {
    return ['text', 'bg-color']
  }

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
   * before accesing the detail data.
   */
  handleCast = (event: Event) => {
    const detail = (event as CustomEvent).detail
    console.log(detail)
  }

  /**
   * eventListeners have to be explicitly defined as an array of tuples.
   * Otherwise, TypeScript will infer them as an array of arrays.
   */
  eventListener: MinzeEvents = [
    ['.button', 'click', handleClick],
    [this, 'minze:click', handleCast]
  ]
}
```

```ts
import Minze from 'minze'
import { MyElement } from './my-element'

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```
