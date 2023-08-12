# TensorFlow

TensorFlow is an end-to-end machine learning platform.

## [TensorFlow.js](https://www.tensorflow.org/js)

TensorFlow.js is a JavaScript library for training, deploying and consuming machine learning models. With Minze and TensorFlow.js you can use Machiene Learning directly in your web components.

> The following guide is based on a fresh Minze CLI installation.

1. Install dependencies.

::: code-group

```bash [npm]
$ npm install @tensorflow/tfjs
```

```bash [yarn]
$ yarn add @tensorflow/tfjs
```

```bash [pnpm]
$ pnpm add @tensorflow/tfjs
```

:::

2. Create a `tf-element.js` file inside the `src/lib` directory.

```
src/
└─ lib/
   ├─ ...
   └─ tf-element.js // [!code ++]
```

3. Import `@tensorflow/tfjs` and define a component inside the new file.

```js
import { MinzeElement } from 'minze'
import * as tf from '@tensorflow/tfjs'

export class MyElement extends MinzeElement {
  reactive = [['pred', 'training ...']]

  html = () => `${this.pred}`

  async onReactive() {
    // simple linear regression (y = x * 2 + 0)

    // features and labels
    const x = tf.tidy(() => tf.range(1, 101, 1).reshape([-1, 1]))
    const y = x.mul(2).add(0)

    // create the model
    const model = tf.sequential()
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }))

    // compile the model
    model.compile({
      loss: 'meanSquaredError',
      optimizer: tf.train.sgd(0.0001)
    })

    // train the model
    await model.fit(x, y, { epochs: 3 })

    // make prediction (the result should be around 400)
    const xPred = tf.tensor([200], [1, 1])
    const yPred = model.predict(xPred)

    // assign to reactive property
    this.pred = Array.isArray(yPred) ? yPred[0] : await yPred.array()

    // clean up
    tf.dispose([x, y, xPred, yPred])
    tf.disposeVariables()
  }
}
```

4. Add the new element to `src/preview.html` file.

<!-- prettier-ignore-start -->
```html
<tf-element></tf-element> // [!code ++]
<my-element>
  <h1>Minze + Vite</h1>
</my-element>
```
<!-- prettier-ignore-end -->

::: tip
For more details about TensorFlow.js refer to the [TensorFlow.js docs](https://www.tensorflow.org/js).
:::
