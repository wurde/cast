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
    $ cast google
`, {
  description: 'Query Google for a list of results.',
})

/**
 * Define script
 */

function google() {
  showHelp(cli)
  console.log('Google')
}

/**
 * Export script
 */

module.exports = google
