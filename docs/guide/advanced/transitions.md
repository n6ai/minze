# Transitions

By exposing the `rendered` attribute you can add animations to rendered components to make their apperance more pleasant. This can be especially useful if you are using an async call to an external API and are awaiting an answer. You can basically control how the component will appear.

::: tip
CSS transition are not 100% reliable, since the transition isn't triggered when the component is imidiatly rendered.
:::

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
