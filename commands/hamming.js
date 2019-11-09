'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast hamming NUMBER1 NUMBER2
`, {
  description: 'Calculate the hamming distance.'
})

/**
 * Define script
 */

function hamming() {
  showHelp(cli)

  console.log('hamming')
}

/**
 * Export script
 */

module.exports = hamming
