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
    $ cast morse
`, {
  description: 'Morse code generator.'
});

/**
 * Define script
 */

function morse() {
  showHelp(cli);
  console.log('morse');
}

/**
 * Export script
 */

module.exports = morse;
