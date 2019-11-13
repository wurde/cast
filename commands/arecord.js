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
    $ cast arecord
`, {
  description: 'Record sound.',
})

/**
 * Define script
 */

function arecord() {
  showHelp(cli)

  console.log('arecord');
}

/**
 * Export script
 */

module.exports = arecord;
