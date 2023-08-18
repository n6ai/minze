# Hugging Face

> [🤗 Hugging Face](https://huggingface.co) is the AI community building the future. Build, train and deploy state of the art models powered by the reference open source in machine learning.

## [Transformers.js](https://huggingface.co/docs/transformers.js)

State-of-the-art Machine Learning for the web. Run Hugging Face Transformers directly in your browser, with no need for a server!

> The following guide is based on a fresh Minze CLI installation.

1. Install dependencies.

::: code-group

```bash [npm]
$ npm add @xenova/transformers
```

```bash [yarn]
$ yarn add @xenova/transformers
```

```bash [pnpm]
$ pnpm add @xenova/transformers
```

:::

2. Create a `hf-element.js` file inside the `src/lib` directory.

```
src/
└─ lib/
   ├─ ...
   └─ hf-element.js // [!code ++]
```

3. Import `@xenova/transformers` and define a component inside the new file.

::: code-group

```js [src/lib/hf-element.js]
import { MinzeElement } from 'minze'
import { pipeline } from '@xenova/transformers'

export class HfElement extends MinzeElement {
  reactive = [['text', 'thinking ...']]

  attrs = ['inputs']

  html = () => `${this.text}`

  async onReactive() {
    const pipe = await pipeline('sentiment-analysis')
    const out = await pipe(this.inputs)

    this.text = JSON.stringify(out[0])
  }
}
```

:::

4. Add the new element to `src/preview.html` file.

::: code-group

<!-- prettier-ignore-start -->
```html [src/preview.html]
<hf-element inputs="I love transformers!"></hf-element> // [!code ++]
<my-element>
  <h1>Minze + Vite</h1>
</my-element>
```
<!-- prettier-ignore-end -->

:::

::: tip
For more details about Transformers.js refer to the [Transformers.js docs](https://huggingface.co/docs/transformers.js).
:::

## [Huggingface.js](https://huggingface.co/docs/huggingface.js)

A collection of JS libraries to interact with the Hugging Face API.

> The following guide is based on a fresh Minze CLI installation.

### [@huggingface/inference](https://www.npmjs.com/package/@huggingface/inference)

A wrapper for the Hugging Face Inference API.

1. Install dependencies.

::: code-group

```bash [npm]
$ npm add @huggingface/inference
```

```bash [yarn]
$ yarn add @huggingface/inference
```

```bash [pnpm]
$ pnpm add @huggingface/inference
```

:::

2. Create a `hf-element.js` file inside the `src/lib` directory.

```
src/
└─ lib/
   ├─ ...
   └─ hf-element.js // [!code ++]
```

3. Import `@huggingface/inference` and define a component inside the new file.

::: danger
Never expose your `access token` to the public, it should be kept private! If you need to protect it in front-end applications, we suggest setting up a proxy server that stores the access token.
:::

::: code-group

```js [src/lib/hf-element.js]
import { MinzeElement } from 'minze'
import { HfInference } from '@huggingface/inference'

const hf = new HfInference('YOUR_HF_ACCESS_TOKEN')

export class HfElement extends MinzeElement {
  reactive = [['text', 'thinking ...']]

  attrs = ['inputs']

  html = () => `${this.text}`

  async onReactive() {
    const result = await hf.textGeneration({
      model: 'gpt2',
      inputs: this.inputs
    })

    this.text = result.generated_text
  }
}
```

:::

4. Add the new element to `src/preview.html` file.

::: code-group

<!-- prettier-ignore-start -->
```html [src/preview.html]
<hf-element inputs="The answer to the universe is"></hf-element> // [!code ++]
<my-element>
  <h1>Minze + Vite</h1>
</my-element>
```
<!-- prettier-ignore-end -->

:::

::: tip
For more details about Huggingface.js refer to the [Huggingface.js docs](https://huggingface.co/docs/huggingface.js).
:::
