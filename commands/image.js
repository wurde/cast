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
    $ cast image [OPTIONS] IMAGE_OR_DIR

  Options:
    --flip-horz    Flip the image(s) horizontally.
    --flip-vert    Flip the image(s) vertically.
`, {
  description: 'Image manipulation.',
  flags: {
    flipHorz: {
      type: 'boolean'
    },
    flipVert: {
      type: 'boolean'
    }
  }
});

/**
 * Define script
 */

async function image(image=null) {
  showHelp(cli, [(!image && cli.input.length < 2)]);

  image = image || cli.input[1];

  console.log('image', image, cli.input, cli.input.length);
}

/**
 * Export script
 */

module.exports = image;
