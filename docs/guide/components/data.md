# Data

A Minze component hast multiple ways of defining data. Every method serves it's own purpose. But at the end of the day all data is going to be accessible from the component in the form of properties.

## this

Accesing any property or method that is defined on the component requires the use of `this`. Inside the component `this` refers to the component itself. The example below illustrates this.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

const myProperty = 'Constant'

class MyElement extends MinzeElement {
  myProperty = 'Component Property'

  onReady() {
    console.log(myProperty) // Constant
    console.log(this.myProperty) // Component Property
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

## Properties

Regular non-reactive property.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  myProperty = 'Hello Minze'

  onReady() {
    console.log(this.myProperty) // Hello Minze
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

## Reactive Properties

`reactive` dynamically creates reactive properties on the element. A change to a reactive property will request a component re-render. `reactive` should be an array containing one or more tuples.
In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes up to 3 values. The first 2 are required, the third is optional.

Tuple structure: [`name`, `value`, `exposeAttr?`]

1. **name:** has to be a `camelCase` string.
2. **value:** can be any value.
3. **exposeAttr:** (optional) not defined or `true`

::: tip
The created property is always the source of truth and not the exposed attribute. So when changing the attribute value, the property will not be updated. But changing the property value will update the attribute.
:::

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  reactive = [
    ['myProperty', 'Hello Minze'],
    ['myNumber', 99]
    // ...
  ]

  onReady() {
    console.log(this.myProperty) // Hello Minze
    console.log(this.myNumber) // 99
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

## Attribute Properties / Attributes

`attrs` dynamically creates reactive properties for attributes. A change to a reactive attribute property will request a component re-render. `attrs` should be an array containing one or more tuples.
In JavaScript, tuples are ordinary arrays, but in TypeScript they are their own type, defining the length of the array and the types of its elements.

Every tuple takes up to 2 values. The first 1 is required, the second is optional.

Tuple structure: [`name`, `value?`]

1. **name:** has to be a `dash-case` string.
2. **value:** (optional) not defined or any value type, which will be used to set the initial attribute, if none is found on the HTML element.

::: tip
The attribute on the component is always the source of truth and not the created attribute property. So when the attribute value changes, the property will be updated. But changing the property will **not** update the attribute.
:::

::: warning
All attribute properties will always be from type `string`, no matter the provided value type, and can be accessed inside the component with the `camelCase` notation.
:::

::: danger
For attribute property updates to be effective (on attribute changes), you have to make these attributes **observable**. It can be done by providing them to the **[observedAttributes](#observed-attributes)** getter.
:::

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  attrs = [
    ['my-attribute']
    // ...
  ]

  onReady() {
    console.log(this.myAttribute) // Hello Minze
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element my-attribute="Hello Minze"></my-element>
```

## Observed Attributes

The `observedAttributes` getter observes the provided attribute names and updates any attribute properties defined by `attrs` accordingly.

**Example**

```js
import Minze, { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  attrs = [
    ['my-attribute']
    // ...
  ]

  static get observedAttributes() {
    return ['my-attribute']
  }

  onReady() {
    console.log(this.myAttribute) // Hello Minze
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element my-attribute="Hello Minze"></my-element>
```
