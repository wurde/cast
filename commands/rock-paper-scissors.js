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
  'rock',
  'paper',
  'scissors',
]
const GAME_STATE = {
  win: ['paper,rock', 'rock,scissors', 'scissors,paper'],
  lose: ['rock,paper', 'scissors,rock', 'paper,scissors'],
  tie: ['rock,rock', 'paper,paper', 'scissors,scissors'],
}

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
  
  const pair = `${response.choice.toLowerCase()},${botChoice}`
  if (GAME_STATE.win.includes(pair)) {
      console.log('You win!')
  } else if (GAME_STATE.lose.includes(pair)) {
      console.log('You lose!')
  } else if (GAME_STATE.tie.includes(pair)) {
      console.log('You tied!')
  } else {
      console.log('Unknown game state')
  }
}

/**
 * Export script
 */

module.exports = rock_paper_scissors
