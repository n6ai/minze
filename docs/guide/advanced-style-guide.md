# Style Guide

By following this Style Guide you will be able to write better code and have a better developer experience when working with Minze.

## Component Names

- Should always consist of at least two words.
- Should be defined in `PascalCase`.
- Shouldn't start with the `Minze` prefix unless they are part of one of the core `minze` packages.
- Should start with a unique prefix like your company name.

```js
✖ Bad // [!code --]
class Text extends MinzeElement {}
class my_component extends MinzeElement {}
class MinzeComponent extends MinzeElement {}

✔ Good // [!code ++]
class UniqueName extends MinzeElement {}
class UniqueButton extends MinzeElement {}
```

## Component File Names

- Should be named consistently in either `dash-case` or `PascalCase`.
- Should be named after the component they are exporting.

```
✖ Bad // [!code --]
my_unique_name.js
my_Unique-name.js
myuniquename.js
MYUNIQUENAME.js

✔ Good // [!code ++]
my-unique-name.js
my-unique-name-two.js

✔ Good // [!code ++]
MyUniqueName.js
MyUniqueNameTwo.js
```

## Number of Components

- Create only one component per file. Otherwise, the file may become too big and hard to maintain.

```js
✖ Bad // [!code --]
export class MyElement extends MinzeElement {}
export class MySecondElement extends MinzeElement {}

✔ Good // [!code ++]
export class MyElement extends MinzeElement {}
```

## Property and Method Names

- Attributes defined in the `attrs` or `observedAttributes` should always be named in `dash-case`.
- All other properties and methods should be named in `camelCase`.

```js
✖ Bad // [!code --]
class MyElement extends MinzeElement {
  reactive = [['my-propery', 'value']]
  attrs = ['myAttribute']
  MYPROPERTY = 'value'
  my_method() {}
}

✔ Good // [!code ++]
class MyElement extends MinzeElement {
  reactive = [['myPropery', 'value']]
  attrs = ['my-attribute']
  myProperty = 'value'
  myMethod() {}
}
```

## Conditional Render Methods

- Should start with the word `when`.

```js
✖ Bad // [!code --]
class MyElement extends MinzeElement {
  active = true

  renderDiv() {
    if (this.active) return `<div>Hello Minze!</div>`
    else return ''
  }

  html = () => `${this.renderDiv()}`
}

✔ Good // [!code ++]
class MyElement extends MinzeElement {
  active = true

  whenActive() {
    if (this.active) return `<div>Hello Minze!</div>`
    else return ''
  }

  html = () => `${this.whenActive()}`
}
```

## Event Callbacks

- Use arrow functions when defining callbacks. They are automatically bound to the component.
- Should start with the word `handle` or a verb that describes what action is performed.

```js
✖ Bad // [!code --]
class MyElement extends MinzeElement {
  buttonCallback() {
    console.log('Clicked!')
  }

  eventListeners = [['.button', 'click', this.buttonCallback.bind(this)]]
}

✔ Good // [!code ++]
class MyElement extends MinzeElement {
  handleClick = () => {
    console.log('Clicked!')
  }

  eventListeners = [['.button', 'click', this.handleClick]]
}

✔ Good // [!code ++]
class MyElement extends MinzeElement {
  reactive = [['count', 0]]

  increaseCount = () => {
    this.count++
  }

  eventListeners = [['.button', 'click', this.increaseCount]]
}
```

## Component Structure

- The structure isn't set in stone, but by following the below example you will have a well-structured component that is easy to maintain.
- The structure should be as follows:
  1. Properties (Data)
  2. Methods
  3. Watchers
  4. Templates
  5. Hooks
  6. Callbacks
  7. Event Listeners

**Example**

```ts
import { MinzeElement } from 'minze'

// interface (only applicable for TypeScript)
export interface MyElement {
  // ...
}

// custom component
export class MyElement extends MinzeElement {
  // reactive properties
  reactive = [['count', 0]]

  // reactive attributes
  attrs = ['text', 'bg-color']

  // observed attributes
  static observedAttributes = ['text', 'bg-color']

  // non-reactive properties
  amount = 0

  // methods
  increaseCount = () => {
    this.count++
  }

  // watchers
  watch = [['count', () => {}]]

  // html template
  html = () => `
    <slot></slot>
  `

  // css template
  css = () => `
    :host {
      display: block;
    }
  `

  // hooks
  onStart = () => {
    console.log('onStart')
  }

  onReady = () => {
    console.log('onReady')
  }

  // callbacks
  handleClick = () => {
    console.log('clicked')
  }

  // event listeners
  eventListeners = [['.button', 'click', this.handleClick]]
}
```
