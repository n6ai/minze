# Transitions

You can determine how components are animated when they are rendered for the first time or between state changes.

## Entry Transitions

Entry transitions run when an element is rendered for the very first time.

### Local

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
      from {
        opacity: 0%;
        transform: translateY(100%);
      }
      to {
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

### Global

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

## View Transitions <Badge text="experimental" type="warning" />

You can activate View Transitions for a specific element by setting the `viewTransitions` option. Minze then leverages the [View Transitions API](https://developer.mozilla.org/docs/Web/API/View_Transitions_API) when the template changes. Currently this only works with supported browsers, see [Can I use](https://caniuse.com/?search=View%20Transition%20API) for more info.

::: tip
By default, View Transitions API animates CSS `opacity`. Read more about customizing View Transitions with CSS on [developer.chrome.com](https://developer.chrome.com/docs/web-platform/view-transitions/).
:::

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  options = { viewTransitions: true }

  reactive = [['active', false]]

  toggle = () => (this.active = !this.active)

  html = () => `
    <button on:click="toggle">
      ${this.active ? 'Active' : 'Inactive'}
    </button>
  `
}

MyElement.define()
```

```html
<my-element></my-element>
```
