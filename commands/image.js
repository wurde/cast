'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const jimp = require('jimp');
const showHelp = require('../helpers/showHelp');
const applyToFileOrDirectory = require('../helpers/applyToFileOrDirectory');

/**
 * Define helpers
 */

async function processImage(image, options = {}) {
  const img = await jimp.read(image);
  const out = createFilename(image);

  if (options.flipHorz && options.flipVert) {
    return img.flip(true, true).write(out);
  } else if (options.flipHorz) {
    return img.flip(true, false).write(out);
  } else if (options.flipVert) {
    return img.flip(false, true).write(out);
  }
}

function createFilename(image) {
  const ext = path.extname(image);
  const basename = path.basename(image, ext);
  const dirname = path.dirname(image);

  return path.join(dirname, `${basename}-x${ext}`);
}

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

async function image(image=null, options = {}) {
  showHelp(cli, [(!image && cli.input.length < 2)]);

  image = image || cli.input[1];
  options = options || cli.flags;

  try {
    applyToFileOrDirectory(image, processImage, options);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Export script
 */

module.exports = image;
