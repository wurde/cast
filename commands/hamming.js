'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const binary = require('./binary')
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

  console.log('hamming', binary([25, 20]));
}

/**
 * Export script
 */

module.exports = hamming
