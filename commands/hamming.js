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
  showHelp(cli, [cli.input.length < 3]);

  const n1 = cli.input[1];
  const n2 = cli.input[2];
  const binaryInput = binary([n1, n2]);

  console.log('binaryInput', binaryInput[n1], binaryInput[n2]);
}

/**
 * Export script
 */

module.exports = hamming
