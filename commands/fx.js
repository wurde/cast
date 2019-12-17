'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const execBin = require('../helpers/execBin');
const showHelp = require('../helpers/showHelp');

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
  execBin('fx');
}

/**
 * Export script
 */

module.exports = fxScript;
