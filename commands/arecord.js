'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const meow = require('meow');
const path = require('path');
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
    $ cast arecord
`, {
  description: 'Record sound.',
});

/**
 * Define script
 */

function arecord() {
  showHelp(cli)

  if (hasArecord) {
    const result = child_process.spawnSync('arecord');
    fs.writeFileSync(path.join(process.cwd(), 'output.wav'), result.stdout)
  } else {
    throw new Error('Requires ALSA soundcard driver.');
  }
}

/**
 * Export script
 */

module.exports = arecord;
