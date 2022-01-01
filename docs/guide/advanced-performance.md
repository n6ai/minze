# Performance

## Reactivity

If you want to create performant web components, you have to use reactivity selectively. It doesn't mean you should ditch it altogether, instead, it's good to know when to use it and when not.

Consider the following example:

```js
import Minze, { MinzeElement } from 'minze'

const nestedArray = []

for (let i = 0; i < 100; i++) {
  nestedArray.push({ num: i })
}

class MyElement extends MinzeElement {
  reactive = [['nestedArray', nestedArray]]

  html = () => `
    ${this.nestedArray[0].num}
  `

  onReady() {
    for (let i = 0; i < 100; i++) {
      this.nestedArray[0].num = i
    }
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
<my-element></my-element>
<my-element></my-element>
<my-element></my-element>
<my-element></my-element>
```

**What's happening here?**

We created a huge array of objects and made it deeply reactive. Then we created a loop in the `onReady` hook and reassigned one of the object's properties a bunch of times. Finally, we are rendering a template that displays the reassigned value. This seems simple but there's a lot going on under the hood:

1. Minze had to iterate over every property inside the `nestedArray` and make them all reactive. That happened `100` times for each used element. Since `my-element` was used 5 times the total is `500`.
2. The template has been rerendered `100` times because it includes a reactive property. Again since `my-element` was used 5 times the total is `500`.

In total, our elements performed about `1000` steps that are not necessary for the end result.

**A much better approach**

```js{10,21}
import Minze, { MinzeElement } from 'minze'

const nestedArray = []

for (let i = 0; i < 100; i++) {
  nesteArray.push({ num: i })
}

class MyElement extends MinzeElement {
  nestedArray = nestedArray

  html = () => `
    ${this.nesteArray[0].num}
  `

  onReady() {
    for (let i = 0; i < 100; i++) {
      this.nesteArray[0].num = i
    }

    this.rerender()
  }
}

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
<my-element></my-element>
<my-element></my-element>
<my-element></my-element>
<my-element></my-element>
```

Here we are not defining any reactive properties at all and instead, we are `rerendering` the component manually once our reassignment loop inside the `onReady` hook is done.

Using this approach our total count for all under the hood steps is `10` for all 5 elements together. Each component is initially rendered `1` time and at the end, it's rerendered again.

This can be further optimized by using the `onStart` hook instead of the `onReady` hook, which is executed before the first render.
