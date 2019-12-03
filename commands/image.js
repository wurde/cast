'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const jimp = require('jimp');
const chalk = require('chalk');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast image IMAGE_OR_DIR
`, {
  description: 'Format images.'
});

/**
 * Define script
 */

async function image() {
  showHelp(cli);

  console.log('image');
}

/**
 * Export script
 */

module.exports = image;
