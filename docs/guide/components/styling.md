# Styling

By default, any CSS defined in the `css` property is scoped to the component and is not affecting the global CSS. Global CSS doesn't affect the styling of the component either. However, there are ways to make the component's styling overwritable by global CSS.

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

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  color = 'red'

  html = () => `<div>Hello Minze!</div>`

  css = () => `
    div {
      background: ${this.color};
    }
  `
}

MyElement.define()
```

```html
<my-element></my-element>
```

### CSS Reset

Global CSS Resets don't work with web components, out of the box, that's why Minze uses an internal CSS Reset Stylesheet optimized for web components. You can disable it in the component options, if required.

Additionally you can add the `no-css-reset` attribute to any element to exclude it from the CSS Reset.

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  // disable reset styles in this component (via options)
  options = { cssReset: false }

  // disable reset styles of the parent component (via attrs)
  attrs = [['no-css-reset', '']]

  // disable reset styles for a specific element in the template (via attribute)
  html = () => `<h1 no-css-reset>Hello Minze!</h1>`
}

MyElement.define()
```

```html
<my-element></my-element>
```

### Conditional Styling

You can use conditional operators (`Ternary`, `Logical OR`, `Nullish coalescing`, ...) inside the `css` property to conditionally apply styling.

```js
import { MinzeElement } from 'minze'

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

MyElement.define()
```

```html
<my-element></my-element>
```

### :host

The `:host` pseudo-class selector selects the component itself (shadow host) inserted into the regular DOM.

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => 'Hello Minze!'

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

MyElement.define()
```

```html
<my-element></my-element>
```

### :host()

The `:host` pseudo-class function selects the component itself, but only if the selector given, as the function's parameter, matches the shadow host.

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => 'Hello Minze!'

  css = () => `
    :host(.themed) {
      background: red;
    }
  `
}

MyElement.define()
```

```html
<my-element class="themed"></my-element>
```

### :host-context()

The `:host-context()` pseudo-class function applies styles conditionally based on parent elements which are outside of the component.

```js
import { MinzeElement } from 'minze'

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

MyElement.define()
```

```html
<div class="light">
  <div>
    <my-element></my-element>
  </div>
</div>

<div class="dark">
  <div>
    <my-element></my-element>
  </div>
</div>
```

### ::slotted

The `::slotted` pseudo-element applies styles to any element that has been placed into a slot.

::: warning
The `::slotted` selector won't select any text nodes placed into a slot, it only targets actual elements.
:::

```js
import { MinzeElement } from 'minze'

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

MyElement.define()
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

### Variables

All `CSS` variables defined inside the component can be externally overwritten.

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `<div>Hello Minze!</div>`

  css = () => `
    :host {
      background: var(--my-color, red);
    }
  `
}

MyElement.define()
```

```html
<my-element></my-element>
```

```css
:root {
  --my-color: blue;
}
```

### Parts

The `part` attribute can be accessed outside the component with the `::part()` pseudo-element selector.

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <div part="my-part">Hello Minze!</div>
  `
}

MyElement.define()
```

```html
<my-element></my-element>
```

```css
::part(my-part) {
  background: rgb(55 245 220);
}
```

### Exportparts

The `exportparts` attribute allows you to select and style elements existing in nested components, by exporting their part names.

This can be done by creating an [attribute property](/guide/components/data#attribute-properties-attributes) inside the component. Alternatively you can set the `exportparts` option to `true`, to automatically export all parts present in the current component.

See [mdn docs](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/exportparts) for more information.

::: warning
The value of the `exportparts` attribute should be a comma-separated list of part names present in the component and which should be made available via a DOM outside of the current structure.
:::

::: code-group

```js [Manual]
import { Minze, MinzeElement } from 'minze'

// nested component
class MyElement extends MinzeElement {
  attrs = [['exportparts', 'my-part, my-part-two']]

  html = () => `
    <div>
      <span part="my-part">Hello</span>
      <span part="my-part-two">Minze!</span>
    </div>
  `
}

// outer component
class MyOuterElement extends MinzeElement {
  html = () => `
    <my-element></my-element>
  `
}

Minze.defineAll([MyElement, MyOuterElement])
```

```js [Auto]
import { Minze, MinzeElement } from 'minze'

// nested component
class MyElement extends MinzeElement {
  options = { exposeAttrs: { exportparts: true } }

  html = () => `
    <div>
      <span part="my-part">Hello</span>
      <span part="my-part-two">Minze!</span>
    </div>
  `
}

// outer component
class MyOuterElement extends MinzeElement {
  html = () => `
    <my-element></my-element>
  `
}

Minze.defineAll([MyElement, MyOuterElement])
```

:::

```html
<my-outer-element></my-outer-element>
```

```css
::part(my-part),
::part(my-part-two) {
  background: rgb(55 245 220);
}
```
