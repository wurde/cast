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
    $ cast groups [USERNAME]
`, {
  description: 'Print groups a user belongs to.'
})

/**
 * Define script
 */

function groups() {
  showHelp(cli)

  console.log('groups')
}

/**
 * Export script
 */

module.exports = groups
