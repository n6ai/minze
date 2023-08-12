# Data

A Minze component has multiple ways of defining data. Every method serves its own purpose. But at the end of the day, all data is going to be accessible from the component in the form of properties.

## this

Accessing any property or method that is defined on the component requires the use of `this`. Inside the component, `this` refers to the component itself.

```js
import { MinzeElement } from 'minze'

const myProperty = 'Constant'

class MyElement extends MinzeElement {
  myProperty = 'Component Property'

  onReady() {
    console.log(myProperty) // 'Constant'
    console.log(this.myProperty) // 'Component Property'
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```

## Properties

Non-reactive properties.

::: tip
Certain keywords are reserved for special functionality and shouldn't be overwritten. E.g. `reactive`, `attrs`, etc. See the [API reference](/api/minze-element) for a comprehensive list.
:::

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  myProperty = 'Hello Minze!'

  onReady() {
    console.log(this.myProperty) // 'Hello Minze!'
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```

## Reactive Properties

`reactive` dynamically creates reactive properties on the element. A change to a reactive property will request a component re-render. `reactive` should be an array containing one or more strings or tuples.
In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes up to 3 values. The first 2 are required, the third is optional.

Tuple structure: [`name`, `value`, `exposeAttr?`]

1. **name:** has to be a `camelCase` string.
2. **value:** can be any value.
3. **exposeAttr:** (optional) not defined or `true`

::: tip
The created property is always the source of truth and not the exposed attribute. So when changing the attribute value, the property will not be updated. But changing the property value will update the attribute.
:::

::: warning
If you use the shorthand notation and provide a `camelCase` string instead of a tuple for a reactive property, the reactive property will be created with a default value of `null`.
:::

::: danger
Never destructure `reactive` properties, otherwise the destructured values lose their reactivity.
:::

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  reactive = [
    'myShorthand',
    ['myProperty', 'Hello Minze!'],
    ['myNumber', 99]
    // ...
  ]

  onReady() {
    console.log(this.myShorthand) // null
    console.log(this.myProperty) // 'Hello Minze!'
    console.log(this.myNumber) // 99
  }
}

MyElement.define()
```

```html
<my-element></my-element>
```

## Computed Properties (Getters)

A computed property is a value that is derived from one or more other values. If one value, the computed property depends on is changed, then the computed property is updated.

::: tip
In Minze Computed Properties are essentialy JavaScript native getter methods.
:::

::: warning
Computed Properties only work with properties that were defined with `reactive` or `attrs`.
:::

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  reactive = [['count', 0]]

  increaseCount = () => this.count++

  get doubledCount() {
    return this.count * 2
  }

  html = () => `
    <button @click="increaseCount">
      Count is: ${this.doubledCount}
    </button>
  `
}

MyElement.define()
```

```html
<my-element></my-element>
```

## Attribute Properties / Attributes

`attrs` dynamically creates reactive properties for attributes. A change to a reactive attribute property will request a component re-render. `attrs` should be an array containing one or more strings or tuples.
In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes up to 2 values. The first 1 is required, the second is optional.

Tuple structure: [`name`, `value?`]

1. **name:** has to be a `dash-case` string.
2. **value:** (optional) not defined or any value type, which will be used to set the initial attribute, if none is found on the HTML element.

::: tip
The attribute on the element is always the source of truth and not the created attribute property inside the component. So when the attribute value changes, the property will be updated. But changing the property will **not** update the attribute.
:::

::: tip
All created attribute properties can be accessed inside the component with the `camelCase` notation. E.g. for `my-attribute` the attribute property will be `myAttribute`.
:::

::: tip
Attributes with values from type `undefined`, `null`, `boolean`, `number` or any values that are JSON parsable are automatically converted to the right type inside the component. If the type can't be auto-inferred from the attribute value, then the value is returned as a string.
:::

::: warning
If you use the shorthand notation and provide a `dash-case` string instead of a tuple for a reactive attribute property, the reactive attribute property will be created with a default value of `null`.
:::

::: danger
For attribute property updates to be effective (on attribute changes), you have to make these attributes **observable**. It can be done by providing them to **[observedAttributes](#observed-attributes)**.
:::

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  attrs = [
    'my-attribute',
    ['my-second-attribute'],
    ['my-third-attribute', 'Hello Minze again!']
    // ...
  ]

  onReady() {
    console.log(this.myAttribute) // null
    console.log(this.mySecondAttribute) // 'Hello Minze!'
    console.log(this.myThirdAttribute) // 'Hello Minze again!''
  }
}

MyElement.define()
```

```html
<my-element my-second-attribute="Hello Minze!"></my-element>
```

## Observed Attributes

The `observedAttributes` property defines attribute names that should be observed, on the element, and updates any attribute properties defined by `attrs` inside the component accordingly.

::: warning
`observedAttributes` has to be a `static` property.
:::

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  attrs = ['my-attribute']

  static observedAttributes = ['my-attribute'] // [!code ++]

  onReady() {
    console.log(this.myAttribute) // 'Hello Minze!'
  }

  onAttributeChange() {
    console.log(this.myAttribute) // whatever the new attribute value is
  }
}

MyElement.define()
```

```html
<my-element my-attribute="Hello Minze!"></my-element>
```

## JSON Attributes

If you pass a valid JSON object in an attribute, it will be auto-converted inside the component.

::: warning
Make sure the HTML attribute on the element is enclosed in signle quotes, no quotes at all or the double quotes of the JSON object are properly escaped.
:::

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  attrs = ['data']

  onReady() {
    console.log(this.data.text) // 'Hello Minze!'
  }
}

MyElement.define()
```

::: code-group

```html
<my-element data='{"text": "Hello Minze!"}'></my-element>
```

```js
class SomeElement extends MinzeElement {
  html = () =>
    `<my-element data=JSON.stringify({ text: 'Hello Minze!' })></my-element>`
}
```

:::
