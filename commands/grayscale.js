'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const jimp = require('jimp');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast grayscale
`, {
  description: 'Change grayscale values of an image.'
});

/**
 * Define script
 */

function grayscale() {
  showHelp(cli)


  console.log('grayscale');
}

/**
 * Export script
 */

module.exports = grayscale;
