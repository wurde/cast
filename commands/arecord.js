'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const hasArecord = which('arecord');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast arecord
`, {
  description: 'Record sound.',
})

/**
 * Define script
 */

function arecord() {
  showHelp(cli)

  if (hasArecord) {
    console.log('arecord');
  } else {
    throw new Error('Requires ALSA soundcard driver.');
  }
}

/**
 * Export script
 */

module.exports = arecord;
