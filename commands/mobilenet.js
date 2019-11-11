'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const meow = require('meow');
const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');
const file = require('./file');
const showHelp = require('../helpers/showHelp');
const IMAGENET_CLASSES = require('../data/imagenet_classes');

/**
 * Constants
 */

const MOBILENET_MODEL_URL =
  'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json';
const CACHE_PATH = path.join(process.env.HOME, '.mobilenet');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast mobilenet IMAGE_PATH

  Options:
    --json   Return information in JSON format.
`, {
  description: 'Generates labels for images via the MobileNetV2 model.',
  flags: {
    json: {
      type: 'boolean',
    }
  }
})

/**
 * Define image classifier
 */

class ImageClassifier {
  constructor() {
    this.model = null;
  }

  async classify(images, topK = 5) {
    await this.ensureModelLoaded();

    return tf.tidy(() => {
      const probs = this.model.predict(images);
      const sorted = true;
      const { values, indices } = tf.topk(probs, topK, sorted);

      const classProbs = values.arraySync();
      const classIndices = indices.arraySync();

      const results = [];
      classIndices.forEach((indices, i) => {
        const classesAndProbs = [];
        indices.forEach((index, j) => {
          classesAndProbs.push({
            className: IMAGENET_CLASSES[index],
            prob: classProbs[i][j]
          });
        });
        results.push(classesAndProbs);
      });

      return results;
    });
  }

  async ensureModelLoaded() {
    if (this.model !== null) return;

    console.log('Loading image classifier model...');

    if (fs.existsSync(CACHE_PATH)) {
      this.model = await tf.loadLayersModel(`file://${CACHE_PATH}/model.json`);
    } else {
      this.model = await tf.loadLayersModel(MOBILENET_MODEL_URL);

      try {
        await this.model.save(`file://${CACHE_PATH}`);
        console.log(`Cached model at ${CACHE_PATH}`);
      } catch (e) {
        console.warn(`Failed to save model at ${CACHE_PATH}`);
      }
    }
  }

  async readImageAsTensor(filePath, height, width) {
    return new Promise((resolve, reject) => {
      Jimp.read(filePath, (err, image) => {
        if (err) {
          reject(err);
        } else {
          const h = image.bitmap.height;
          const w = image.bitmap.width;
          const buffer = tf.buffer([1, h, w, 3], 'float32');
          image.scan(0, 0, w, h, function(x, y, index) {
            buffer.set(image.bitmap.data[index], 0, y, x, 0);
            buffer.set(image.bitmap.data[index + 1], 0, y, x, 1);
            buffer.set(image.bitmap.data[index + 2], 0, y, x, 2);
          });
          resolve(
            tf.tidy(() =>
              tf.image
                .resizeBilinear(buffer.toTensor(), [height, width])
                .div(255)
            )
          );
        }
      });
    });
  }
}

/**
 * Define script
 */

async function mobilenet(dirPath='.') {
  showHelp(cli);

  const imageClassifier = new ImageClassifier();
  await imageClassifier.ensureModelLoaded();

  const files = fs.readdirSync(dirPath)
    .map(file => path.join(process.cwd(), file))
    .filter(filePath => {
      const mimeType = file(filePath);
      if (mimeType.type === 'image/jpeg') {
        return true
      } else {
        return false
      }
    })
  
  const height = imageClassifier.model.inputs[0].shape[1];
  const width = imageClassifier.model.inputs[0].shape[2];
  const imageTensors = [];

  for (let i = 0; i < files.length; i++) {
    const imageTensor = await imageClassifier.readImageAsTensor(
      files[i],
      height,
      width
    );
    imageTensors.push(imageTensor);
  }

  const axis = 0;
  const batchImageTensor = tf.concat(imageTensors, axis);

  const t0 = tf.util.now();
  const classNamesAndProbs = await imageClassifier.classify(batchImageTensor);
  const tElapsedMillis = tf.util.now() - t0;

  if (arguments.length === 0) {
    if (cli.flags.json) {
      console.log(JSON.stringify(classNamesAndProbs));
    } else {
      console.log(chalk.white.bold(`\nMobileNetV2 results (elapsed milliseconds: ${Math.ceil(tElapsedMillis)}):\n`));
      console.log(classNamesAndProbs);
    }
  }

  return classNamesAndProbs;
}

/**
 * Export script
 */

module.exports = mobilenet
