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
 * Define Player
 */

class Player {
  health = 100
}

/**
 * Define script
 */

function adventure() {
  showHelp(cli)

  let main_player = new Player()

  console.log('Adventure', main_player)
}

/**
 * Export script
 */

module.exports = adventure
