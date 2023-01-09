# Styling

By default, any CSS defined in the `css` property is scoped to the component and is not affecting the global CSS. Global CSS doesn't affect the styling of the component either. However, there are ways to make the component's styling overwritable by the global CSS.

::: tip
By default, all [typography](https://cssreference.io/typography/) properties are inherited from the global CSS, like `color`, `font-family`, `font-size`, `font-weight` etc.
:::

::: warning
Custom elements are `display: inline` by default, in Minze however they are initially set to `display: block`. To overwrite this behavior use the `:host` selector.
:::

## Internal

Components can be styled internally without affecting the CSS outside the component.

### CSS

The `css` property is used to define the scoped CSS for the component. It expects a function with a return value of type `string`.

**Example**

```js
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  color = 'red'

  html = () => `<div>Hello Minze!</div>`

  css = () => `
    div {
      background: ${this.color};
    }
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element>Hello Minze!</my-element>
```

### Conditional Styling

You can use conditional operators (`Ternary`, `Logical OR`, `Nullish coalescing`, ...) inside the `css` property to conditionally apply styling.

**Example**

```js
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  isActive = true
  color = 'rgb(255 255 255)'

  html = () => `
    <div>Hello Minze!</div>
  `

  css = () => `
    div {
      background: ${this.isActive ? 'rgb(55 245 220)' : 'transparent'};
      color: ${this.color || 'rgb(0 0 0)'};
      border-color: ${this.color ?? 'rgb(0 0 0)'};
    }
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

### Host

The `:host` pseudo-class selector styles the component itself, and not the content inside its template.

**Example**

```js
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `Hello Minze!`

  css = () => `
    :host {
      background: red;
    }

    :host(:hover) {
      background: blue;
    }

    :host(:active) {
      background: green;
    }
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element>Hello Minze!</my-element>
```

### Host Context

The `:host-context` pseudo-class selector applies styles conditionally based on parent elements.

**Example**

```js
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `<div>Hello Minze!</div>`

  css = () => `
    :host-context(.light) {
      background: white;
      color: black;
    }

    :host-context(.dark) {
      background: black;
      color: white;
    }
  `
}

Minze.defineAll([MyElement])
```

```html
<div class="light">
  <div>
    <my-element>Hello Minze!</my-element>
  </div>
</div>

<div class="dark">
  <div>
    <my-element>Hello Minze!</my-element>
  </div>
</div>
```

### Slots

The `::slotted` pseudo-class selector applies styles to any element that has been placed into a slot.

::: warning
The `::slotted` selector only works when used inside the component. Note also that this selector won't select any text nodes placed into a slot, it only targets actual elements.
:::

**Example**

```js
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <slot name="slot-1"></slot>
    <slot name="slot-2"></slot>
  `

  css = () => `
    ::slotted(*) {
      background: red;
    }

    ::slotted([slot=slot-2]) {
      background: blue;
    }
  `
}

Minze.defineAll([MyElement])
```

<!-- prettier-ignore-start -->
```html
<my-element>
  <div slot="slot-1">Hello Minze!</div>
  <div slot="slot-2">Hello Minze!</div>
</my-element>
```
<!-- prettier-ignore-end -->

## External

By default, global CSS doesn't affect the styling of the component. You can however expose certain `"style-hooks"` that can be accessed from outside the component.

### Parts

The `part` attribute can be accessed outside the component with the `::part` pseudo-class selector.

**Example**

```js
import { Minze, MinzeElement } from 'minze'

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

### Variables

All `CSS` variables defined inside the component can be externally overwritten.

**Example**

```js
import { Minze, MinzeElement } from 'minze'

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
