'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast cat FILE
`, {
  description: 'Syntax highlighting in your terminal.'
});

/**
 * Define script
 */

function cat(file = null) {
  showHelp(cli, [(!file && cli.input.length < 2)]);

  file = file || cli.input[1];

  console.log('cat', file);
}

/**
 * Export script
 */

module.exports = cat;
