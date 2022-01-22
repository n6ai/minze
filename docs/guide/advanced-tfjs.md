# TensorFlow.js

[Tensorflow.js](https://www.tensorflow.org/js) is a library for machine learning in JavaScript. With Minze and Tensorflow.js you can use ML directly in your web components.

> The following guide is based on a fresh Minze CLI installation.

## Development

1. Install `@tensorflow/tfjs`.

```bash
$ npm i @tensorflow/tfjs
```

2. Navigate to the `lib` directory and create a new file.

```
src/
└─ lib/
   ├─ ...
   └─ my-element.js
```

3. Paste the following code into the file.

```js
import * as tf from '@tensorflow/tfjs'
import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  reactive = [['data', null]]

  html = () => `
    ${this.data ? `<div>${this.data}</div>` : '<div>loading...</div>'}
  `

  async onReactive() {
    // simple linear regression (y = x * 2)

    // features and labels
    const x = tf.tidy(() => tf.range(1, 101, 1).reshape([-1, 1]))
    const y = x.mul(2)

    // create the model
    const model = tf.sequential()
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }))

    // compile the model
    model.compile({
      loss: 'meanSquaredError',
      optimizer: tf.train.sgd(0.0001)
    })

    // train the model
    await model.fit(x, y, { epochs: 10 })

    // make prediction (the result should be around 400)
    const xPred = tf.tensor([200], [1, 1])
    const yPred = model.predict(xPred)

    // assign to reactive property
    this.data = (await yPred.array())[0]

    // clean up
    tf.dispose([x, y, xPred, yPred])
    tf.disposeVariables()
  }
}
```

4. Open the `module.js` and `template.js` files.

```
src/
├─ ...
├─ module.js
└─ template.js
```

5. Define an export for your component at the bottom of `module.js`.

```js
// ...
export * from './lib/my-element'
```

5. Add your component to the template inside `template.js`.

```js
export default `
  <my-element></my-element>
  <minze-counter></minze-counter>
`
```

6. Run the npm `dev` script, and navigate to `http://localhost:3000`.

```bash
$ npm run dev
```

7. Your component should be displayed in the browser. After a short while, the prediction will be shown.

## Production

::: warning
The TensorFlow.js library is quite big in size and shouldn't be included in the production build of your components, but loaded separately.
:::

For production, you need to adjust the `rollup.config.js` file, so that `@tensorflow/tfjs` package is not included in the output bundle. Additionally, you need to define a global for the CDN build.

```js{9,15}
// rollup.config.js

// ...
const createConfig = ({ format, file }) => {
  const config = {
    // ...
    external: [
      format !== 'umd' && /^minze/,
      /@tensorflow/
    ],
    output: {
      dir: resolve(__dirname, 'dist'),
      format: format,
      globals: {
        '@tensorflow/tfjs': 'tf'
      }
    }
  }
})
// ...
```

## Using

> Let's assume you published your library under the name `my-awesome-package`

### npm

```bash
$ npm install minze @tensorflow/tfjs my-awesome-package
```

```js
import Minze from 'minze'
import { MyElement } from 'my-awesome-package'

Minze.defineAll([MyElement])
```

```html
<my-element></my-element>
```

### CDN

If you have published your package to npm, you can also load it via a CDN link from `unpkg` or `jsdelivr`.

```html
<html>
  <head></head>
  <body>
    <my-element></my-element>

    <script src="//unpkg.com/my-awesome-package@latest" defer></script>
    <script src="//unpkg.com/@tensorflow/tfjs@latest" defer></script>
  </body>
</html>
```
