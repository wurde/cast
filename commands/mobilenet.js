'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const tf = require('@tensorflow/tfjs-node');
const file = require('./file');
const showHelp = require('../helpers/showHelp');

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
`, {
  description: 'Generates labels for images via the MobileNetv2 model.'
})

/**
 * Define image classifier
 */

class ImageClassifier {
  constructor() {
    this.model = null;
  }

  async classify() {
    await this.ensureModelLoaded();
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
}

/**
 * Define script
 */

async function mobilenet() {
  showHelp(cli);

  const imageClassifier = new ImageClassifier();
  await imageClassifier.ensureModelLoaded();

  const files = fs.readdirSync('.')
    .map(file => path.join(process.cwd(), file))
    .filter(filePath => {
      const mimeType = file(filePath);
      if (mimeType.type === 'image/jpeg') {
        return true
      } else {
        return false
      }
    })

  console.log('files', files);
}

/**
 * Export script
 */

module.exports = mobilenet
