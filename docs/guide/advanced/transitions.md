# Transitions

You can determine how components should appear when they are rendered. This can be especially useful if you want to animate componets.

::: tip
CSS transitions are not 100% reliable, since a transition isn't triggered when the component is immediately rendered under certain circumstances.
:::

## Component

Animations can be defined inside of component.

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `<div>Hello Minze!</div>`

  css = () => `
    :host {
      animation: rendered 0.25s ease-in;
    }

    @keyframes rendered {
      0% {
        opacity: 0%;
        transform: translateY(100%);
      }
      100% {
        opacity: 100%;
        transform: translateY(0);
      }
    }
  `
}

MyElement.define()
```

```html
<my-element></my-element>
```

## Global

By exposing the `rendered` attribute you can add animations to all rendered components, or define more specific rules.

::: code-group

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  options = { exposeAttrs: { rendered: true } }

  html = () => `<div>Hello Minze!</div>`
}

MyElement.define()
```

```css
/* hide all custom web components until they are defined */
:not(:defined) {
  visibility: hidden;
}

[rendered] {
  animation: rendered 0.25s ease-in;
}

@keyframes rendered {
  0% {
    opacity: 0%;
    transform: translateY(100%);
  }
  100% {
    opacity: 100%;
    transform: translateY(0);
  }
}
```

:::

```html
<my-element></my-element>
```
