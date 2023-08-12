# Events

Events can be used to communicate between components and the outside world.

## @events

`@events` are a shorthand form of [Event Listeners](#event-listeners) that are directly defined inside the html template as attributes.

**Structure:** The attribute name starts with an `@` sign and is directly followed by a valid [JavaScript DOM event type](https://en.wikipedia.org/wiki/DOM_event#HTML_events) or a `CustomEvent` name, the value of the attribute is the name of the method, that should be called when the event is triggered.

**Example:** `@click="callback"` `@custom-event-name="callback"`

::: warning
`@events` only work with methods defined inside the component class.
:::

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <button @click="handleClick">
      Button
    </button>
  `

  handleClick = () => console.log('clicked')
}

MyElement.define()
```

```html
<my-element></my-element>
```

## Event Listeners

An event Listener can listen for specific events and run a callback function whenever the event is triggered.
In a MinzeElement, you can add event listeners in bulk by specifying an array of tuples for the `eventListeners` property. In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every eventListeners tuple takes exactly 3 values.

Tuple structure: [`eventTarget`, `eventName`, `callback`]

1. **eventTarget:** where the event listener should be attached to. Can be a valid CSS selector (for elements inside the `html` property), `this` (The component itself), `window` or a `BroadcastChannel`.
2. **eventName:** the name of the event to listen to.
3. **callback:** a callback function that runs when the eventName is matched.

::: warning
Web components are meant to be encapsulated HTML elements, it's a bad idea to create event listeners inside the component and attach them all over the place. That's why the targets outside of the component are intentionally limited to the `window` object, to prevent `event-listener-pollution`.
:::

**Example**

```js
import { MinzeElement } from 'minze'

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

MyElement.define()
```

```html
<my-element></my-element>
```

## Dispatching

Dispatch a custom event from a component and broadcast it through the document up the component tree. This event can be either listened to by other components or the outside world.

::: tip
It's a good idea to prefix your custom event names to avoid collisions with other libraries.
:::

**Example**

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  html = () => `
    <button @click="handleClick">
      Button
    </button>
  `

  handleClick = () => this.dispatch('minze:click')

  onReady() {
    const optionalDetail = { msg: 'Hello Minze!' }
    this.dispatch('minze:ready', optionalDetail)
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
