'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const prompts = require('prompts')
const chalk = require('chalk')

/**
 * Constants
 */

const HISTORY_PATH = path.join(process.env.HOME, 'rock-paper-scissors.txt')
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
`, {
  description: 'Play rock-paper-scissors.'
})

/**
 * Define helper
 */

function init_state() {
  if (fs.existsSync(HISTORY_PATH)) {
    const history = fs.readFileSync(HISTORY_PATH, 'utf8')
    return history.split(',').map(i => Number(i))
  } else {
    const history = '0,0,0'
    fs.writeFileSync(HISTORY_PATH, history, 'utf8')
    return history.split(',').map(i => Number(i))
  }
}

function write_state(state) {
  fs.writeFileSync(HISTORY_PATH, state, 'utf8')
}

function print_state(state) {
  console.log(`
    Welcome to Rock Paper Scissors!

    Current Stats:
      Wins: ${state[0]}, Ties: ${state[1]}, Losses: ${state[2]}
  `)
}

/**
 * Define script
 */

async function rock_paper_scissors() {
  showHelp(cli)

  const state = init_state()
  print_state(state)

  const response = await prompts({
    type: 'text',
    name: 'choice',
    message: 'Choose rock, paper, or scissors:'
  })

  const botChoice = CHOICES[Math.floor(Math.random() * 3)]
  
  console.log(`  You chose ${chalk.bold(response.choice.toUpperCase())}.`)
  console.log(`  Bot chose ${chalk.bold(botChoice.toUpperCase())}.`)
  
  const pair = `${response.choice.toLowerCase()},${botChoice}`
  if (GAME_STATE.win.includes(pair)) {
    write_state(`${state[0]+1},${state[1]},${state[2]}`)
    console.log(`  You ${chalk.green.bold('win'.toUpperCase())}!\n`)
  } else if (GAME_STATE.lose.includes(pair)) {
    write_state(`${state[0]},${state[1]},${state[2]+1}`)
    console.log(`  You ${chalk.red.bold('lose'.toUpperCase())}!\n`)
  } else if (GAME_STATE.tie.includes(pair)) {
    write_state(`${state[0]},${state[1]+1},${state[2]}`)
    console.log(`  You ${chalk.yellow.bold('tied'.toUpperCase())}!\n`)
  } else {
    console.log('  Unknown game state\n')
  }
}

/**
 * Export script
 */

module.exports = rock_paper_scissors
