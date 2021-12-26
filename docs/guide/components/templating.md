# Templating

By default, templating is done through template literals. The `html` property expects a function with a return value of type `string`.

::: tip
There is a private property called `template` that combines the defined `html` and `css` properties into one. The final result is what's being rendered.
:::

## HTML

The `html` property defines the `html` template of the component. If no `html` property is defined on the component it defaults to `<slot></slot>`.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  myText = 'Hello Minze!'

  html = () => `
    <div>${this.myText}</div>
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

**Example**

::: tip
You can get started without even declaring any properties, it's still a valid component.
:::

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {}

Minze.defineAll([MyElement])
```

```html
<my-element>Hello Minze!</my-element>
```

### Slots

Slots are a way to add elements from the outside world to the element. There are two types of slots:

- **default slots** - only one slot per component can be the default slot.
- **named slots** - as many as you like.

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
  <div>Hello Minze!</div>
  <div slot="my-slot">Hello Minze again!<div>
</my-element>
```

## Rendering

Some advanced techniques can be used in `html` and `css` templates.

### Conditional Rendering

If you want to render a part of the template based on a specific condition, you can use the `ternary` operator, or define the logic in a separate method.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  isVisible = false

  whenVisible = () => {
    if (this.isVisible) return `<div>Hello Minze!</div>`
  }

  html = () => `
    ${this.isVisible ? '<div>Hello Minze!</div>' : ''}
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

You can destructure the properties and methods of a component to avoid writing `this` over and over again. Simply pass them as an argument to the template.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  someValue = 'Hello Minze!'

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
