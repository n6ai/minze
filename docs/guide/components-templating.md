# Templating

By default, templating is done through [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). The `html` property expects a function with a return value of type `string`.

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
  isVisible = true

  whenVisible = () => {
    if (this.isVisible) return `<div>Hello Minze!</div>`
    else return ''
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

### Contitional Attributes

Conditional rendering can also be used for attributes.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  isActive = true

  html = () => `
    <div ${this.isActive ? 'class="active"' : ''}>
      Hello Minze!
    </div>
  `
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

### List Rendering

To render a list in a template literal you can use the `map` method in cobination with `join`.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  myList = [1, 2, 3]

  html = () => `
    <ul>
      ${this.myList.map((item) => `<li>${item}</li>`).join('')}
    </ul>
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

### Loading Indicators

If you are fetching some data from an external API you can use a loading indicator to display a loading state. In the example below the template is automatically rerendered after the reactive data property is reassigned.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  reactive = [['data', undefined]]

  html = () => `
    ${this.data ? `<div>${this.data}</div>` : '<div class="loading"></div>'}
  `

  css = () => `
    .loading {
      width: 1rem;
      height: 1rem;
      background: rgb(55 245 220);
      animation: loading 1s infinite;
    }

    @keyframes loading {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `

  async onReactive() {
    const delay = 2000 // ms
    await new Promise((resolve) => setTimeout(resolve, delay))

    this.data = 'Hello Minze!'
    console.log(`simulated response time: ${delay}`)
  }
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

## Patching

Under the hood, Minze uses a concept called `patching`. It always tries to gracefully patch in and out all attributes and text before hard rerendering parts of, or the whole template. It achieves this by comparing the new template to the current one and changing only what's needed. Patching only works if the number of elements plus their types and amount of text nodes stay the same during reactive changes.

::: tip
Patching is not necessary for every component, sometimes a hard rerender can be a better choice.
:::

::: tip
If you want to take advantage of patching, your templates should always return the exact same amount of elements and text nodes between different states.
:::

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  reactive = [['active', false]]

  html = () => `
    <button>
      Toggle state
    </button>

    <!-- div is patched -->
    <div>
      <div>${this.active}</div>
    </div>

    <!-- div is patched -->
    <div>
      <div>${this.active ? 'true' : 'false'}</div>
    </div>

    <!-- div is patched -->
    <div>
      ${this.active ? '<div>true</div>' : '<div>false</div>'}
    </div>

    <!-- div isn't patched, but rerendered -->
    <div>
      ${this.active ? '<div>true</div>' : 'false'}
    </div>

    <!-- div isn't patched, but rerendered -->
    <div>
      ${this.active ? '<div>true</div>' : '<span>false</span>'}
    </div>

    <!-- div isn't patched, but rerendered -->
    <div>
      ${this.active ? '<div>true</div> <div>&nbsp;</div>' : '<div>false</div>'}
    </div>
  `

  handleClick = () => {
    this.active = !this.active
  }

  eventListeners = [['button', 'click', this.handleClick]]
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```
