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
    $ cast schedule
`)

/**
 * Define script
 */

function schedule() {
  showHelp(cli)

  console.log('Schedule')
}

/**
 * Export script
 */

module.exports = schedule
