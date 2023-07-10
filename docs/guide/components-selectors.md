# Selectors

::: warning
When using selectors with Hooks, keep in mind that the template might not yet be rendered during certain Hooks like `onStart`, `onReactive` and `beforeRender`. The safest place to use them is inside the `onRender` and `onReady` Hooks.
:::

## select / selectAll

You can use selectors to select elements within the components `html` template (shadow DOM) by providing a valid `CSS` selector.

- `select` - Selects the first element that matches the selector.
- `selectAll` - Selects all elements that match the selector.

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <div id="my-div"></div>
    <div></div>
  `

  onReady() {
    const element = this.select('#my-div')
    const elements = this.selectAll('div')
    console.log(element, elements)
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```

## slotted

Returns an array of slotted element(s) for provided slot name or the `default` slot, otherwise `null` if none found.

**Example**

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <slot></slot>
    <slot name="named-slot"></slot>
  `

  onReady() {
    console.log(this.slotted('default')) // [h1, p]
    console.log(this.slotted('named-slot')) // [h2, p]
  }
}

MyElement.define()
```

```html
<my-element>
  <h1>Headline 1</h1>
  <p>Paragraph 1</p>

  <h2 slot="named-slot">Headline 2</h2>
  <p slot="named-slot">Paragraph 2</p>
</my-element>
```
