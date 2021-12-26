# Events

Events can be used to communicate between components and the outside world.

## Event Listeners

An event Listener can listen for specific events and run a callback function whenever the event is triggered.
In a MinzeElement, you can add event listeners in bulk by specifying an array of tuples for the `eventListeners` property. In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every eventListeners tuple takes exactly 3 values.

Tuple structure: [`eventTarget`, `eventName`, `callback`]

1. **eventTarget:** where the event listener should be attached to. Can be a valid CSS selector (for elements inside the `html` property), `this` (The component itself) or `window`.
2. **eventName:** the name of the event to listen to.
3. **callback:** a callback function that runs when the eventName is matched.

::: warning
Web components are meant to be encapsulated HTML elements, it's a bad idea to create event listeners inside the component and attach them all over the place. That's why the targets outside of the component are intentionally limited to the `window` object, to prevent `event-listener-pollution`.
:::

::: danger
When passing a method as a callback, make sure it's either defined as an arrow function or properly bound to the component.
:::

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <button class="button">
      Button
    </button>
  `

  handleClick = (event) => {
    console.log(event)
  }

  eventListeners = [
    ['.button', 'click', this.handleClick]
    // ...
  ]
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

## Casting

Casting (shorthand for `Broadcasting`) is the process of dispatching a custom event from a component and broadcasting it through the document up the component tree. This event can be either listened to by other components or the outside world.

::: tip
It's a good idea to prefix your custom event names to avoid collisions with other libraries.
:::

**Example**

```js
import Minze, { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady() {
    this.cast('minze:ready')
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```
