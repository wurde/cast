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
    $ cast companies
`, {
  description: 'Lookup table for companies in the S&P 500.'
})

/**
 * Define script
 */

function companies() {
  showHelp(cli)

  console.log('companies')
}

/**
 * Export script
 */

module.exports = companies
