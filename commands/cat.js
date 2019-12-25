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
    $ cast cat
`, {
  description: 'Syntax highlighting in your terminal.'
});

/**
 * Define script
 */

function cat() {
  showHelp(cli);

  console.log('cat');
}

/**
 * Export script
 */

module.exports = cat;
