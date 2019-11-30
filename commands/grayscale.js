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

function grayscale(image) {
  showHelp(cli, [(!image && cli.input.length < 2)]);

  image = image || cli.input[1];

  if (fs.existsSync(image)) {
    jimp.read(image)
      .then(file => {
        return file.greyscale().write('image-greyscale.jpg') 
      })
      .catch(err => console.error(err));
  } else {
    throw new Error(`MissingFile: no such image ${image}`);
  }
}

/**
 * Export script
 */

module.exports = grayscale;
