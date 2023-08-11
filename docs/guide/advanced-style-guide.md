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
  get MyCoMpUtEdPrOpErTy() {}
  my_method() {}
}

✔ Good // [!code ++]
class MyElement extends MinzeElement {
  reactive = [['myPropery', 'value']]
  attrs = ['my-attribute']
  myProperty = 'value'
  get myComputedProperty() {}
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

- Should start with the word `handle` or a verb that describes what action is performed.

```js
✖ Bad // [!code --]
class MyElement extends MinzeElement {
  buttonCallback() {
    console.log('Clicked!')
  }

  eventListeners = [['.button', 'click', this.buttonCallback]]
}

✔ Good // [!code ++]
class MyElement extends MinzeElement {
  handleClick() {
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
  1. Options
  2. Data (`reactive`, `attrs`, `observedAttributes`, properties, getters)
  3. Watchers (`watch`)
  4. Methods
  5. Templates (`html`, `css`)
  6. Hooks (`onStart`, `onReactive`, `onReady`, ...)
  7. Event Listeners (`eventListeners`)

**Example**

```ts
import { MinzeElement } from 'minze'

// interface (only applicable for TypeScript)
export interface MyElement {
  // ...
}

// custom component
export class MyElement extends MinzeElement {
  options = {}

  reactive = [['count', 0]]

  attrs = ['text', 'bg-color']
  static observedAttributes = ['text', 'bg-color']

  watch = [['count', () => {}]]

  increaseCount = () => this.count++

  html = () => `
    <button>
      <slot></slot>
    </button>
  `

  css = () => `
    :host {
      display: block;
    }
  `

  onStart = () => {
    console.log('onStart')
  }

  onReady = () => {
    console.log('onReady')
  }

  eventListeners = [['button', 'click', this.increaseCount]]
}
```
