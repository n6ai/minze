# Styling

By default, any CSS defined in the `css` property is scoped to the component and is not affecting the global CSS. Global CSS doesn't affect the styling of the component either. However, there are ways to make the component's styling overwritable by the global CSS.

::: tip
By default, all [typography](https://cssreference.io/typography/) properties are inherited from the global CSS, like `color`, `font-family`, etc.
:::

::: warning
Custom elements are `display: inline` by default, in Minze however they are initially set to `display: block`. To overwrite this behavior use the `:host` selector.
:::

## CSS

The `css` property is used to define the scoped CSS for the component. It expects a function with a return value of type `string`.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  color = 'red'

  html = () => `<div>Hello Minze!</div>`

  css = () => `
    :host {
      background: ${this.color};
    }
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element>Hello Minze!</my-element>
```

## Variables

All `CSS` variables defined inside the component can be externally overwritten.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `<div>Hello Minze!</div>`

  css = () => `
    :host {
      background: var(--my-color, red);
    }
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element>Hello Minze!</my-element>
```

```css
:root {
  --my-color: blue;
}
```

## Parts

The `part` attribute can be accessed outside the component.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <div part="my-part">Hello Minze!</div>
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element>Hello Minze!</my-element>
```

```css
::part(my-part) {
  background: rgb(55 245 220);
}
```

## Contitional Styling

You can use the `ternary` operator to conditionally render properties inside `css`.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  isActive = true

  html = () => `
    <div>Hello Minze!</div>
  `

  css = () => `
    div {
      background: ${this.isActive ? 'rgb(55 245 220)' : 'transparent'};
    }
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```
