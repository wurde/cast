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
    $ cast say MESSAGE
`, {
  description: 'Send text-to-speech output to speech-dispatcher.',
})

/**
 * Define script
 */

function say() {
  showHelp(cli);
  console.log('say');
}

/**
 * Export script
 */

module.exports = say;
