'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const showHelp = require('../helpers/showHelp');

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
