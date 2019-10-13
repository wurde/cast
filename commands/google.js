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
    $ cast google QUERY
`, {
  description: 'Query Google for a list of results.',
})

/**
 * Define script
 */

function google() {
  showHelp(cli)

  const query = cli.input.slice(1).join(' ')
}

/**
 * Export script
 */

module.exports = google
