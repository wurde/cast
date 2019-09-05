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
 * Define Item
 */

class Item {
  constructor({ name, description, health }) {
    this.name = name
    this.description = description
    this.health = health

    if (this.health > 0) {
      this.rng = Math.floor(Math.random() * 100)
    } else {
      this.rng = Math.floor(Math.random() * 100) + 15
    }
  }
}

/**
 * Define Activity
 */

class Activity {
  constructor({ name, description, health }) {
    this.name = name
    this.description = description
    this.health = health

    if (this.health > 0) {
      this.rng = Math.floor(Math.random() * 100)
    } else {
      this.rng = Math.floor(Math.random() * 100) + 15
    }
  }
}

/**
 * Define script
 */

function adventure() {
  showHelp(cli)

  let main_player = new Player()

  let first_area = new Area({ name: 'Outside', description: 'Any direction will do.'})

  let first_item = new Item({
    name: 'Glowing Ignot',
    description: 'You pickup something glowing on the ground.',
    health: -15
  })

  let first_activity = new Activity({
    name: 'Apple Tree',
    description: 'You reach up and eat an apple.',
    health: 5
  })

  console.log('Adventure', main_player, first_area, first_item,  first_activity)
}

/**
 * Export script
 */

module.exports = adventure
