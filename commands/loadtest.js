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
    $ cast loadtest URL
`, {
  description: 'Performance testing.'
});

/**
 * Define script
 */

function loadtest(url) {
  showHelp(cli, [(!url && cli.input.length < 2)]);

  url = url || cli.input[1];
}

/**
 * Export script
 */

module.exports = loadtest;
