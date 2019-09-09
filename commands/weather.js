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
    $ cast weather
`)

/**
 * Define script
 */

function weather() {
  showHelp(cli)
  console.log("weather")
}

/**
 * Export script
 */

module.exports = weather
