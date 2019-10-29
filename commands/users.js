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
    $ cast users
`, {
  description: 'Print currently logged in users.'
})

/**
 * Define script
 */

function users() {
  showHelp(cli)

  console.log('users')
}

/**
 * Export script
 */

module.exports = users
