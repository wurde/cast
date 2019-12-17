'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const child_process = require('child_process');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const bin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'fx')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast fx
`, {
  description: 'Command-line JSON viewer.'
});

/**
 * Define script
 */

function fxScript() {
  showHelp(cli);

  if (!fs.existsSync(bin)) {
    console.error(
      chalk.red.bold('Missing binary. Run `npm install` and try again.')
    );
    process.exit(1);
  }

  child_process.fork(bin);
}

/**
 * Export script
 */

module.exports = fxScript;
