'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const jimp = require('jimp');
const showHelp = require('../helpers/showHelp');

/**
 * Define helpers
 */

async function processImage(image) {
  const img = await jimp.read(image);
  const out = createFilename(image);
  return img.greyscale().write(out);
}

function createFilename(image) {
  const ext = path.extname(image);
  const basename = path.basename(image, ext);
  const dirname = path.dirname(image);

  return path.join(dirname, `${basename}-bw${ext}`)
}

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
      const stats = fs.statSync(image);

      if (stats.isDirectory()) {
        const dir = image;
        const files = fs.readdirSync(image, { withFileTypes: true })
        .filter(file => file.isFile())
        .map(file => path.join(dir, file.name));

        files.forEach(file => processImage(file));
      } else {
        processImage(image);
      }
    } else {
      throw new Error(`cannot find file ${image}`);
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * Export script
 */

module.exports = grayscale;
