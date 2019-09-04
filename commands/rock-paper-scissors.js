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
    $ cast rock-paper-scissors
`)

/**
 * Define script
 */

function rock_paper_scissors() {
  showHelp(cli)

  console.log("Rock Paper Scissors")
}

/**
 * Export script
 */

module.exports = rock_paper_scissors
