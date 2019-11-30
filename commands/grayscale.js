'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const meow = require('meow');
const jimp = require('jimp');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast grayscale IMAGE
`, {
  description: 'Change grayscale values of an image.'
});

/**
 * Define script
 */

async function grayscale(image) {
  showHelp(cli, [(!image && cli.input.length < 2)]);

  image = image || cli.input[1];

  try {
    if (fs.existsSync(image)) {
      const img = await jimp.read(image);

      return img.greyscale().write('image-greyscale.jpg') ;
    } else {
      throw new Error(`MissingFile: no such image ${image}`);
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * Export script
 */

module.exports = grayscale;
