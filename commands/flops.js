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
    $ cast flops
`, {
  description: 'Print a reference table for FLOPS.'
})

/**
 * Define script
 */

function flops() {
  showHelp(cli)
  console.log('flops')
}

/**
 * Export script
 */

module.exports = flops
