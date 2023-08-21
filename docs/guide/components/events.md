# Events

Events can be used to communicate between components and the outside world.

## on:events

An `on:event` is a shorthand form of an [Event Listener](#event-listeners) that is directly defined inside the html template as an attribute.

**Structure:** The attribute name starts with the keyword `on:` and is directly followed by a valid [JavaScript DOM event type](https://en.wikipedia.org/wiki/DOM_event#HTML_events) or a `CustomEvent` name, the value of the attribute is the name of the method, that should be called when the event is triggered.

**Example:** `on:click="callback"` `on:custom-event-name="callback"`

::: warning
`on:events` only work with methods defined inside the component class. When using the shorthand notation, the event name and the method name inside the component have to match.
:::

::: danger
For compatibility reasons it's possible to use the `@event` notation. E.g. `@click="callback"`, but it's discouraged, since an attribute with an `@` symbol isn't a valid attribute name, thus isn't 100% compatible with Minzes [patching](/guide/components/templating#patching) mechanism.
:::

::: code-group

```js [Regular]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <button on:click="handleClick">
      Button
    </button>
  `

  handleClick = (event) => {
    console.log(event.target) // <button on:click="handleClick"></button>
  }
}

MyElement.define()
```

```js [Shorthand]
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <button on:click>
      Button
    </button>
  `

  click = (event) => {
    console.log(event.target) // <button on:click></button>
  }
}

MyElement.define()
```

:::

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
Web components are meant to be encapsulated HTML elements, it's a bad idea to create event listeners inside the component and attach them all over the place. That's why the targets outside of the component are intentionally limited to the `window` object.
:::

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <button class="button">
      Button
    </button>
  `

  handleClick = (event) => {
    console.log(event.target) // <button class="button"></button>
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

```js
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  onReady() {
    this.dispatch('minze:event', { msg: 'Hello Minze!' })
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```
