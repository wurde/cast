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
  console.log(chalk.white.bold(figlet.textSync('ADVENTURE', { font: 'Bright' })))
  console.log('')

  let main_player = new Player()
  console.log(chalk.white.bold('*You wake up*\n'))
  
  while (true) {
    let response = await prompts({
      type: 'text',
      name: 'action',
      message: () => {
        if (main_player.health < 20) {
          return chalk.red.bold('(╯°□°）╯︵ ┻━┻')
        } else if (main_player.health < 50) {
          return chalk.yellow.bold('(ಠ_ಠ)')
        } else {
          return chalk.green.bold('(ʘ‿ʘ)')
        }
      }
    })
    console.log('')

    // TODO Handle get,take,drop for items.
    // TODO Handle i for listing player inventory.

    // let first_area = new Area({ name: 'Outside', description: 'Any direction will do.' })
    // let first_item = new Item({ name: 'Glowing Ignot', description: 'You pickup something glowing on the ground.', health: -15 })
    // let first_activity = new Activity({ name: 'Apple Tree', description: 'You reach up and eat an apple.', health: 5 })

    if (['n', 's', 'e', 'w'].includes(response.action)) {
      console.log(chalk.green.bold('Move\n'))
      main_player.health -= 10
    } else if (main_player.health <= 0 || response.action === 'q') {
      main_player.health = 0
      console.log(chalk.red.bold('*Death by exhaustion*\n'))
      console.log(chalk.white.bold('// GAME OVER\n'))
      process.exit(0)
    } else {
      main_player.health -= 10
      console.log(chalk.yellow.bold('*You stare up in confusion*\n'))
    }
  }
}

/**
 * Export script
 */

module.exports = adventure
