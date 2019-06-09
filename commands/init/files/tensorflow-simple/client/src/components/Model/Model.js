'use strict'

/**
 * Dependencies
 */

const React = require('react')
const styles = require('./styles/index')
const tf = require('@tensorflow/tfjs')

/**
 * Constants
 */

const useState = React.useState
const useEffect = React.useEffect

/**
 * Define component
 */

function Model(props) {
  const [prediction, setPrediction] = useState('pending...')

  useEffect(() => {
    // Define a model for linear regression.
    const model = tf.sequential()

    // Add a dense layer of neurons
    model.add(tf.layers.dense({units: 1, inputShape: [1]}))

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'})

    // Generate some synthetic data for training.
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1])
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1])

    // Train the model using the data.
    model.fit(xs, ys).then(() => {
      // Use the model to do inference on a data point the model hasn't seen before:
      // Open the browser devtools to see the output
      let tensor = model.predict(tf.tensor2d([5], [1, 1]))
      setPrediction(tensor.toString())
    })
  }, [])

  return (
    <styles.ModelStyle>
      <div className="row">
        <div className="col-12">
          <h2>Model: {prediction}</h2>
        </div>
      </div>
    </styles.ModelStyle>
  )
}

/**
 * Export component
 */

module.exports = Model
