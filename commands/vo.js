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
    $ cast vo WORDS...
`, {
  description: 'Voiceover recording.'
});

/**
 * Define script
 */

function vo(words) {
  showHelp(cli, [(!words && cli.input.length < 2)]);

  words = words || cli.input.slice(1).join(' ');

  console.log('vo', words);
}

/**
 * Export script
 */

module.exports = vo;
