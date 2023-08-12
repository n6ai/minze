# Selectors

::: tip
Selectors access the rendered component template, see [Hooks Overview](/guide/components/hooks#overview) to know during which hooks the template is already rendered.
:::

## select / selectAll

Selects elements within the components `html` template (shadow DOM) by providing a valid `CSS` selector.

- `select` - Selects the first element that matches the selector.
- `selectAll` - Selects all elements that match the selector.

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `
    <div id="my-div"></div>
    <div></div>
  `

  onReady() {
    console.log(this.select('#my-div')) // <div id="my-div"></div>
    console.log(this.selectAll('div')) // [div, div]
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```

## slotted

Returns an array of slotted element(s) for provided slot name or the `default` slot.

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
