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
    $ cast gp
`)

/**
 * Define script
 */

function gp() {
  showHelp(cli)

  console.log('gp')
}

/**
 * Export script
 */

module.exports = gp
