'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
const figlet = require('figlet')
const prompts = require('prompts')
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

async function adventure() {
  showHelp(cli)

  console.log('')
  console.log(figlet.textSync('ADVENTURE', { font: 'Bright' }))
  console.log('')

  let main_player = new Player()
  console.log(chalk.white.bold('*You wake up*\n'))
  // print(`// ${main_player.current_room).toUpperCase()}\n}`)
  // print(main_player.current_room.description, '\n')
  
  while (true) {
    // TODO Handle n,s,e,w for movement.
    // TODO Handle get,take,drop for items.
    // TODO Handle i for listing player inventory.

    let response = await prompts({
      type: 'select',
      name: 'action',
      // TODO change color based on health green to red
      message: `${chalk.green.bold('☺')}`,
      choices: [
        { title: 'Move north', value: 'north' },
        { title: 'Move south', value: 'south' },
        { title: 'Move east', value: 'east' },
        { title: 'Move west', value: 'west' },
        { title: 'Quit', value: 'quit' },
      ]
    })
    console.log('')

    let first_area = new Area({ name: 'Outside', description: 'Any direction will do.' })
    let first_item = new Item({ name: 'Glowing Ignot', description: 'You pickup something glowing on the ground.', health: -15 })
    let first_activity = new Activity({ name: 'Apple Tree', description: 'You reach up and eat an apple.', health: 5 })

    if (response.action === 'q' || response.action === 'quit') {
      console.log(chalk.red.bold('*Death by exhaustion*\n'))
      console.log(chalk.white.bold('// GAME OVER\n'))
      process.exit(0)
    }
  }
}

/**
 * Export script
 */

module.exports = adventure
