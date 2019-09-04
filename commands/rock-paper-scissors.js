'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const prompts = require('prompts')

/**
 * Constants
 */

const CHOICES = [
  'Rock',
  'Paper',
  'Scissors',
]

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

  const botChoice = CHOICES[Math.floor(Math.random() * 3)]
  
  console.log(`You chose ${response.choice}`)
  console.log(`Bot chose ${botChoice}`)
}

/**
 * Export script
 */

module.exports = rock_paper_scissors
