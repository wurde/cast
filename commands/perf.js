'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const { table } = require('table')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast perf URL
`, {
  description: 'Print performance metrics.'
})

/**
 * Define script
 */

function perf() {
  showHelp(cli)

  console.log('perf')
}

/**
 * Export script
 */

module.exports = perf
