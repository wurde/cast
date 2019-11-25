'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const child_process = require('child_process');
const showHelp = require('../helpers/showHelp');
const which = require('../helpers/which');

/**
 * Constants
 */

const hasAplay = which('aplay');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast aplay FILE
`, {
  description: 'Play sound.',
})

/**
 * Define script
 */

function aplay(file=null) {
  showHelp(cli, [!file && cli.input.length < 2]);

  file = file || cli.input[1];

  if (hasAplay) {
    child_process.spawnSync('aplay', [file]);
  } else {
    throw new Error('Requires ALSA soundcard driver.')
  }
}

/**
 * Export script
 */

module.exports = aplay;
