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
  const out = options.overwrite ? image : createFilename(image);

  if (options.rotate) {
    return img.rotate(Number(options.rotate)).write(out);
  } else if (options.resize) {
    const dim = options.resize.split(',').map(x => Number(x));
    return img.resize(dim[0], dim[1]).write(out);
  } else if (options.crop) {
    const args = options.crop.split(',').map(x => Number(x));
    return img.crop(args[0], args[1], args[2], args[3]).write(out);
  } else if (options.gaussian) {
    return img.gaussian(Number(options.gaussian)).write(out);
  } else if (options.posterize) {
    return img.posterize(Number(options.posterize)).write(out);
  } else if (options.opacity) {
    return img.opacity(Number(options.opacity)).write(out);
  } else if (options.brightness) {
    return img.brightness(Number(options.brightness)).write(out);
  } else if (options.contrast) {
    return img.contrast(Number(options.contrast)).write(out);
  } else if (options.background) {
    return img.background(options.contrast).write(out);
  } else if (options.flipHorz && options.flipVert) {
    return img.flip(true, true).write(out);
  } else if (options.flipHorz) {
    return img.flip(true, false).write(out);
  } else if (options.flipVert) {
    return img.flip(false, true).write(out);
  } else if (options.invert) {
    return img.invert().write(out);
  } else if (options.sepia) {
    return img.sepia().write(out);
  } else if (options.greyscale) {
    return img.greyscale().write(out);
  } else if (options.normalize) {
    return img.normalize().write(out);
  } else if (options.opaque) {
    return img.opaque().write(out);
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
    --rotate DEG       Rotate the image clockwise by a number of degrees.
    --resize W,H       Resize the image.
    --crop X,Y,W,H     Crop to the given region.
    --gaussian N       Gaussian blur the image by N pixels.
    --posterize N      Apply a posterization effect with N level.
    --opacity N        Multiply the alpha channel by N factor (0 to 1).
    --brightness N     Adjust the brighness by N (-1 to +1).
    --contrast N       Adjust the contrast by N (-1 to +1).
    --background HEX   Set the default pixel colour.
    --flip-horz        Flip the image(s) horizontally.
    --flip-vert        Flip the image(s) vertically.
    --invert           Invert the image colours.
    --sepia            Apply a sepia wash to the image.
    --greyscale        Remove colour from the image.
    --normalize        Normalize the channels in an image.
    --opaque           Set the alpha channel on every pixel to fully opaque.
    --overwrite        Overwrite the original file.
`, {
  description: 'Image manipulation.',
  flags: {
    rotate: { type: 'string' },
    resize: { type: 'string' },
    crop: { type: 'string' },
    gaussian: { type: 'string' },
    posterize: { type: 'string' },
    opacity: { type: 'string' },
    brightness: { type: 'string' },
    contrast: { type: 'string' },
    background: { type: 'string' },
    flipHorz: { type: 'boolean' },
    flipVert: { type: 'boolean' },
    invert: { type: 'boolean' },
    sepia: { type: 'boolean' },
    greyscale: { type: 'boolean' },
    normalize: { type: 'boolean' },
    opaque: { type: 'boolean' },
    overwrite: { type: 'boolean' },
  }
});

/**
 * Define script
 */

async function image(image = null, options = null) {
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
