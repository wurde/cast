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
 * Define Area
 */

class Area {
  constructor({ name, description }) {
    this.name = name
    this.description = description
  }
}

/**
 * Define script
 */

function adventure() {
  showHelp(cli)

  let main_player = new Player()

  let first_area = new Area({ name: 'Outside', description: 'Any direction will do.'})

  console.log('Adventure', main_player, first_area)
}

/**
 * Export script
 */

module.exports = adventure
