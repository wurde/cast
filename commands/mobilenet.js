'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const MOBILENET_MODEL_URL =
  'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json';

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
 * Define script
 */

function mobilenet() {
  showHelp(cli);
  console.log('mobilenet');
}

/**
 * Export script
 */

module.exports = mobilenet
