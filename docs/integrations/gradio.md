# Gradio

> Build & Share Delightful Machine Learning Apps with [Gradio](https://www.gradio.app). Gradio is the fastest way to demo your machine learning model with a friendly web interface so that anyone can use it, anywhere!

## [@gradio/client](https://www.npmjs.com/package/@gradio/client)

A javascript (and typescript) client to call Gradio APIs.

> The following guide is based on a fresh Minze CLI installation.

1. Install dependencies.

::: code-group

```bash [npm]
$ npm install @gradio/client
```

```bash [yarn]
$ yarn add @gradio/client
```

```bash [pnpm]
$ pnpm add @gradio/client
```

:::

2. Create a `gr-element.js` file inside the `src/lib` directory.

```
src/
└─ lib/
   ├─ ...
   └─ gr-element.js // [!code ++]
```

3. Import `@gradio/client` and define a component inside the new file.

```js
import { MinzeElement } from 'minze'
import { client } from '@gradio/client'

export class GrElement extends MinzeElement {
  reactive = [['answer', 'thinking ...']]

  html = () => `
    <div>
      <strong>Context:</strong>
      <slot name="context"></slot>
    </div>

    <div>
      <strong>Question:</strong>
      <slot name="question"></slot>
    </div>

    <div>
      <strong>Answer:</strong>
      <div>${this.answer}</div>
    </div>
  `

  css = () => `
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `

  async onReady() {
    const context = this.querySelector('[slot=context]')?.innerText
    const question = this.querySelector('[slot=question]')?.innerText

    const app = await client('https://gradio-question-answering.hf.space/')
    const result = await app.predict('/predict', [context, question])

    this.answer = result.data ?? 'Something went wrong.'
  }
}
```

4. Add the new element to `src/preview.html` file.

<!-- prettier-ignore-start -->
```html
<gr-element> // [!code ++]
  <div slot="context"> // [!code ++]
    The Amazon rainforest, also known in English as Amazonia or the Amazon Jungle, is a moist broadleaf forest that covers most of the Amazon basin of South America. This basin encompasses 7,000,000 square kilometres (2,700,000 sq mi), of which 5,500,000 square kilometres (2,100,000 sq mi) are covered by the rainforest. This region includes territory belonging to nine nations. The majority of the forest is contained within Brazil, with 60% of the rainforest, followed by Peru with 13%, Colombia with 10%, and with minor amounts in Venezuela, Ecuador, Bolivia, Guyana, Suriname and French Guiana. The Amazon represents over half of the planet's remaining rainforests, and comprises the largest and most biodiverse tract of tropical rainforest in the world, with an estimated 390 billion individual trees divided into 16,000 species. // [!code ++]
  </div>// [!code ++]
  <div slot="question"> // [!code ++]
    Which continent is the Amazon rainforest in? // [!code ++]
  </div> // [!code ++]
</gr-element> // [!code ++]

<my-element>
  <h1>Minze + Vite</h1>
</my-element>
```
<!-- prettier-ignore-end -->

::: tip
For more details about @gradio/client refer to the [Gradio JavaScript Client guide](https://www.gradio.app/guides/getting-started-with-the-js-client) and [Gradio JavaScript Client docs](https://www.gradio.app/docs/js-client).
:::
