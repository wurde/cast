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
 * Constants
 */

const EDGE_ENHANCE = [[0,0,0], [-1,1,0], [0,0,0]];
const EDGE_DETECTION = [[-1,-1,-1], [-1,8,-1], [-1,-1,-1]];
const SHARPEN = [[0,-1,0], [-1,5,-1], [0,-1,0]];
const EMBOSS = [[-2,-1,0], [-1,1,1], [0,1,2]];
const BLUR = [[1,1,1], [1,1,1], [1,1,1]];

/**
 * Define helpers
 */

async function processImage(image, options={}) {
  const img = await jimp.read(image);
  const out = options.overwrite ? image : createFilename(image);
  return img.convolute(options.filter).write(out);
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
    $ cast convolute IMAGE_OR_DIR

  Options
    --kernel MATRIX    Custom matrix filter.
    --edge-enhance     Edge enhance the image.
    --edge-detect      Edge detect the image.
    --sharpen          Sharpen the image.
    --emboss           Emboss the image.
    --blur             Blur the image.
    --overwrite        Overwrite the original file.
`, {
  description: 'Apply an image filter using convolution matrix.',
  flags: {
    kernel: { type: 'string' },
    edgeEnhance: { type: 'boolean' },
    edgeDetect: { type: 'boolean' },
    sharpen: { type: 'boolean' },
    emboss: { type: 'boolean' },
    blur: { type: 'boolean' },
    overwrite: { type: 'boolean' }
  }
});

/**
 * Define script
 */

async function convolute(image, options={}) {
  showHelp(cli, [
    (!image && cli.input.length < 2),
    ((!cli.flags.kernel && !options.kernel) && 
     (!cli.flags.edgeEnhance && !options.edgeEnhance) && 
     (!cli.flags.edgeDetect && !options.edgeDetect) && 
     (!cli.flags.sharpen && !options.sharpen) && 
     (!cli.flags.emboss && !options.emboss) && 
     (!cli.flags.blur && !options.blur))
  ]);

  image = image || cli.input[1];

  let filter = cli.flags.kernel || options.kernel;
  filter = filter ? JSON.parse(filter) : filter;

  filter = cli.flags.edgeEnhance ? EDGE_ENHANCE : filter;
  filter = cli.flags.edgeDetect ? EDGE_DETECTION : filter;
  filter = cli.flags.sharpen ? SHARPEN : filter;
  filter = cli.flags.emboss ? EMBOSS : filter;
  filter = cli.flags.blur ? BLUR : filter;

  const overwrite = options.overwrite || cli.flags.overwrite;

  try {
    applyToFileOrDirectory(image, processImage, {
      filter: filter,
      overwrite: overwrite
    });
  } catch (err) {
    console.error(err);
  }
}

/**
 * Export script
 */

module.exports = convolute;
