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
    $ cast tty
`, {
  description: 'Print the file name of the terminal connected to standard input.'
})

/**
 * Define script
 */

function tty() {
  showHelp(cli)
  console.log('tty')
}

/**
 * Export script
 */

module.exports = tty
