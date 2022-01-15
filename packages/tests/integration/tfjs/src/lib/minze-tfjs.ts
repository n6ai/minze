import * as tf from '@tensorflow/tfjs'
import { MinzeElement, Reactive } from 'minze'

export interface MinzeTfjs {
  prediction: number | null
}

export class MinzeTfjs extends MinzeElement {
  reactive: Reactive = [['prediction', null]]

  html = () => `
    ${
      this.prediction
        ? `Model Prediction: <span class="prediction">${this.prediction}<span>`
        : 'Loading ...'
    }
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
    const yPred = model.predict(xPred) as tf.Tensor

    // assign to reactive property
    this.prediction = ((await yPred.array()) as number[])[0]

    // clean up
    tf.dispose([x, y, xPred, yPred])
    tf.disposeVariables()
  }
}
