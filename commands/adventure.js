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
    $ cast adventure
`)

/**
 * Define script
 */

function adventure() {
  showHelp(cli)
  console.log('Adventure')
}

/**
 * Export script
 */

module.exports = adventure
