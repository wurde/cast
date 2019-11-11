'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const MOBILENET_MODEL_URL =
  'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json';
const CACHE_PATH = path.join(process.env.HOME, '.mobilenet.json');

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

  async ensureModelLoaded(loadingCallback) {
    if (this.model !== null) return;

    console.log('Loading image classifier model...');
    console.log(`file://${CACHE_PATH}`);
    // this.model = await tf.loadLayersModel(`file://${CACHE_PATH}`);
  }
}

/**
 * Define script
 */

async function mobilenet() {
  showHelp(cli);

  const imageClassifier = new ImageClassifier();
  await imageClassifier.ensureModelLoaded();
}

/**
 * Export script
 */

module.exports = mobilenet
