'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const lodash = require('lodash');
const child_process = require('child_process');
const showHelp = require('../helpers/showHelp');
const which = require('../helpers/which');

/**
 * Constants
 */

const hasArecord = which('arecord');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast arecord [options] FILE
`, {
  description: 'Record sound.',
});

/**
 * Define script
 */

function arecord(file, options = null) {
  showHelp(cli, [(!file && cli.input.length < 2)]);

  file = file || cli.input.slice(1).join(' ');
  options = lodash.map((options || cli.flags), (v, k) => `--${k}=${v}`);

  if (hasArecord) {
    child_process.spawnSync('arecord', [...options, file]);
  } else {
    throw new Error('Requires ALSA soundcard driver.');
  }
}

/**
 * Export script
 */

module.exports = arecord;
