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
    $ cast shutdown
`, {
  description: 'Shut down the system.'
})

/**
 * Define script
 */

function shutdown() {
  showHelp(cli)

  console.log('shutdown')
}

/**
 * Export script
 */

module.exports = shutdown
