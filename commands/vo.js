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
    $ cast vo
`, {
  description: 'Voiceover recording.'
});

/**
 * Define script
 */

function vo() {
  showHelp(cli);

  console.log('vo');
}

/**
 * Export script
 */

module.exports = vo;
