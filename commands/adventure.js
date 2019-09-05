'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
const figlet = require('figlet')
const prompts = require('prompts')
const wrap_ansi = require('wrap-ansi')
const showHelp = require('../helpers/showHelp')

/**
 * Constants
 */

const directions = {
  'n': 'north',
  's': 'south',
  'e': 'east',
  'w': 'west',
}

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
  items = []

  constructor(map, area) {
    this.map = map
    this.current_area = area
  }

  move(direction) {
    const next_area_name = this.current_area[directions[direction]]

    if (next_area_name) {
      const next_area = this.map.area(next_area_name)
      console.log(chalk.green.bold(`*Move ${directions[direction].toUpperCase()}*\n`))
      console.log(`// ${next_area_name.toUpperCase()}\n`)
      console.log(wrap_ansi(chalk.white.bold(next_area.description), 70), '\n')
      console.log(chalk.white.bold(`Items: ${next_area.items.map(item => item.name).join(', ')}\n`))

      this.current_area = next_area
    } else {
      console.log(chalk.yellow.bold(`*You try to move ${directions[direction].toUpperCase()}, but the way is blocked*.\n`))
    }

    this.health -= 5
  }

  take(action) {
    const item_name = action.replace('take ', '')
    
    if (this.current_area.has_item(item_name)) {
      console.log(chalk.white.bold(`Take: ${item_name}\n`))
      const item = this.current_area.take(item_name)
      if (Math.random() < item.rng) this.health += item.health
      this.items = this.items.concat(item)
    } else {
      this.health -= 5
      console.log(chalk.yellow.bold('*You stare up in confusion*\n'))
    }
  }
  
  drop(action) {
    const item_name = action.replace('drop ', '')
    const item = this.items.find(i => i.name === item_name)

    if (item) {
      console.log(chalk.white.bold(`Drop: ${item_name}\n`))
      this.current_area.drop(item)
      this.items = this.items.filter(i => i.name !== item_name)
    } else {
      this.health -= 5
      console.log(chalk.yellow.bold('*You stare up in confusion*\n'))
    }
  }

  inventory() {
    console.log(chalk.white.bold(`Inventory: ${this.items.map(i => i.name).join(', ')}\n`))
  }
}

/**
 * Define Area
 */

class Area {
  constructor({ name, description, items = [], north = null, south = null, east = null, west = null }) {
    this.name = name
    this.description = description
    this.items = items
    this.north = north
    this.south = south
    this.east = east
    this.west = west
  }

  has_item(name) {
    return this.items.map(i => i.name).includes(name)
  }

  take(name) {
    const item = this.items.find(item => item.name === name)
    this.items = this.items.filter(i => i.name !== item.name)
    return item
  }

  drop(item) {
    this.items = this.items.concat(item)
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

class Map {
  constructor() {
    this.areas = []
    
    this.areas = this.areas.concat(
      new Area({ name: 'Outside', description: 'Any direction will do.', north: 'Fairy Asylum', south: 'Crimson Sanctum', east: 'Dining Room of the Sigl', west: 'Watchtower of Ending' }),
      new Area({ name: 'Fairy Asylum', description: "You pass through a twisted trail that leads passed countless rooms and soon you enter a dark area. Small holes and carved paths cover the walls, it looks like a community or burrow for small creatures.", south: 'Outside', west: 'Desolate Prison of the Miners', items: [
        new Item({ name: 'Glowing Ignot', description: 'You pickup something glowing on the ground.', health: -15 }),
      ]}),
      new Area({ name: 'Crimson Sanctum', description: "A narrow granite door in a gloomy thicket marks the entrance ahead. Beyond the granite door lies a large, clammy room. It's covered in rat droppings, dead insects and puddles of water. Your torch allows you to see what seems like some form of a sacrificial chamber, destroyed and absorbed by time itself.", north: 'Outside', items: [
        new Item({ name: 'Glowing Ignot', description: 'You pickup something glowing on the ground.', health: -15 }),
      ]}),
      new Area({ name: 'Dining Room of the Sigl', description: "Inside the room looks warm and cozy. It has been built with red bricks and has brown stone decorations. Tall, large windows brighten up the room and have been added in a fairly symmetrical pattern.", east: 'Room of Knowledge', west: 'Outside', items: [
        new Item({ name: 'Glowing Ignot', description: 'You pickup something glowing on the ground.', health: -15 }),
      ]}),
      new Area({ name: 'Room of Knowledge', description: "Inside the room looks grandiose. It has been built with wheat colored bricks and has granite decorations. Small, triangular windows let in plenty of light and have been added to the room in a mostly symmetric way.", west: 'Dining Room of the Sigl', items: [
        new Item({ name: 'Glowing Ignot', description: 'You pickup something glowing on the ground.', health: -15 }),
        new Item({ name: 'Parchment', description: "You read a quickly drawn note. 'Drop me off at the Watchtower of Ending'", health: 10 }),
      ]}),
      new Area({ name: 'Desolate Prison of the Miners', description: "Beyond the boulder lies a large, dusty room. It's covered in remains, broken stone and rubble.", east: 'Fairy Asylum', items: [
        new Item({ name: 'Glowing Ignot', description: 'You pickup something glowing on the ground.', health: -15 }),
      ]}),
      new Area({ name: 'Watchtower of Ending', description: "You pass many rooms and passages, it's one big labyrinth of twists and turns. You eventually make it to what is likely the final room. A mysterious granite door blocks your path. Dried blood splatters are all over it, you enter cautiously.", east: 'Outside', items: [
        new Item({ name: 'Glowing Ignot', description: 'You pickup something glowing on the ground.', health: -15 }),
        new Item({ name: 'Parchment', description: "You read a quickly drawn note. 'Drop me off at the Chrimson Sanctum'", health: 10 }),
      ]}),
    )
    // new Activity({ name: 'Apple Tree', description: 'You reach up and eat an apple.', health: 5 })
  }

  area(name) {
    return this.areas.find(area => area.name === name)
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

  let map = new Map()
  let main_player = new Player(map, map.area('Outside'))
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

    const user_input = response.action.toLowerCase()
    console.log(`user_input '${user_input.constructor}'`)

    if (main_player.health <= 0 || ['q', 'quit'].includes(user_input)) {
      main_player.health = 0
      console.log(chalk.red.bold('*Death by exhaustion*\n'))
      console.log(chalk.white.bold('// GAME OVER\n'))
      process.exit(0)
    } else if (['h', 'help'].includes(user_input)) {
      main_player.health -= 5
      console.log(chalk.white.bold('Navigation: n, s, e, w'))
      console.log(chalk.white.bold('Items: take ITEM, drop ITEM, inventory'))
      console.log(chalk.white.bold('Exit: q, quit\n'))
    } else if (['n', 's', 'e', 'w'].includes(user_input)) {
      main_player.move(user_input)
    } else if (user_input.match(/^take/)) {
      main_player.take(user_input)
    } else if (user_input.match(/^drop/)) {
      main_player.drop(user_input)
    } else if (['i', 'inventory'].includes(user_input)) {
      main_player.inventory(user_input)
    } else {
      main_player.health -= 5
      console.log(chalk.yellow.bold('*You stare up in confusion*\n'))
    }
  }
}

/**
 * Export script
 */

module.exports = adventure
