'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const prompts = require('prompts')

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

async function rock_paper_scissors() {
  showHelp(cli)

  const response = await prompts({
    type: 'text',
    name: 'choice',
    message: 'Choose rock, paper, or scissors:'
  })

  console.log(`You chose ${response.choice}`)
}

/**
 * Export script
 */

module.exports = rock_paper_scissors
