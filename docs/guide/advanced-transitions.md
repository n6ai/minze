# Transitions

You can determine how components should appear when they are rendered. This can be especially useful if you are using an async call to an external API and are awaiting an answer.

::: tip
CSS transitions are not 100% reliable, since a transition isn't triggered when the component is immediately rendered.
:::

## Local

Animations can be added per component.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html = () => `<div>Hello Minze!</div>`

  css = () => `
    :host {
      animation: minze-rendered 0.25s ease-in;
    }

    @keyframes minze-rendered {
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

  async onStart() {
    const delay = 500 // ms
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

## Global

By exposing the `rendered` attribute you can add animations to all rendered components, or define more specific rules.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  options = {
    exposeAttrs: {
      rendered: true
    }
  }

  html = () => `<div>Hello Minze!</div>`

  async onStart() {
    const delay = 500 // ms
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

```css
/* hide all custom web components until they are defined */
:not(:defined) {
  display: none;
}

[rendered] {
  display: block;
  animation: minze-rendered 0.25s ease-in;
}

@keyframes minze-rendered {
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
