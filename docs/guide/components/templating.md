# Templating

...

## HTML

...

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <div>Hello Minze!</div>
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

### Slots

...

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <slot></slot>
    <slot name="my-slot"></slot>
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element>
  <div>Hello Minze</div>
  <div slot="my-slot">Hello Minze<div>
</my-element>
```

### Parts

...

## Rendering

Some advanced techniques that can be used `html` and `css` in templates.

### Conditional Rendering

If you want to render a part of a component based on a specific condition you can use the `ternary` operator, or define the logic in a separate method.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  isVisible = false

  whenVisible = () => {
    if (this.isVisible) return `<div>Hello Minze</div>`
  }

  html = () => `
    ${this.isVisible ? '<div>Hello Minze</div>' : ''}
    ${this.whenVisible()}
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

### List Rendering

To render a list in a template literal you can use the `map` method.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  myList = [1, 2, 3]

  html = () => `
    <ul>
      ${this.myList.map((item) => `<li>${item}</li>`).join('')}
    <ul>
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

### Destructuring

You can destructure the properties and methods of an component to avoid writing `this` over and over again. Simply pass them as an argument to the template.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  someValue = 'Hello Minze'

  html = ({ someValue } = this) => `
    <div>${someValue}</div>
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

### Cloaking

Cloaking is the process of hiding elements from the user until they are defined.
You can hide all custom web components until they are defined with the following `CSS` selector:

```css
:not(:defined) {
  display: none;
}
```
