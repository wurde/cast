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
    $ cast morse MESSAGE
`, {
  description: 'Morse code generator.'
});

/**
 * Define script
 */

async function morse(msg) {
  showHelp(cli, [(!msg && cli.input.length < 2)]);

  msg = msg || cli.input.slice(1).join(' ');

  // TODO convert text into morse code.
  // TODO print to console dit-dot sequence.
  // TODO play morse code.

  console.log('morse', msg);
}

/**
 * Export script
 */

module.exports = morse;
