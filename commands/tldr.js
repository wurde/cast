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
    $ cast tldr
`)

/**
 * Define script
 */

function tldr() {
  showHelp(cli)
  console.log('tldr')
}

/**
 * Export script
 */

module.exports = tldr
