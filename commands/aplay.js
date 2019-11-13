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
    $ cast aplay FILE
`, {
  description: 'Play sound.',
})

/**
 * Define script
 */

function aplay() {
  showHelp(cli)

  console.log('aplay');
}

/**
 * Export script
 */

module.exports = aplay;
