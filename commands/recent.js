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
    $ cast recent
`)

/**
 * Define script
 */

function recent() {
  showHelp(cli)
  console.log('recent')
}

/**
 * Export script
 */

module.exports = recent
