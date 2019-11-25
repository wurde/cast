'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const meow = require('meow');
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
    $ cast arecord FILE
`, {
  description: 'Record sound.',
});

/**
 * Define script
 */

function arecord(file=null) {
  showHelp(cli, [(!file && cli.input.length < 2)]);

  file = file || cli.input[1];

  if (hasArecord) {
    const result = child_process.spawnSync('arecord');
    fs.writeFileSync(file, result.stdout);
  } else {
    throw new Error('Requires ALSA soundcard driver.');
  }
}

/**
 * Export script
 */

module.exports = arecord;
