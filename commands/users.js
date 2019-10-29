'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
const child_process = require('child_process')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast users
`, {
  description: 'Print currently logged in users.'
})

/**
 * Define script
 */

async function users() {
  showHelp(cli)

  const usersList = await child_process.execSync('users', {
    encoding: 'utf8'
  }).trim().split(' ')

  if (arguments.length === 0) {
    console.log(`\n  ${chalk.green.bold(usersList.join(' '))}\n`)
  }
  
  return usersList
}

/**
 * Export script
 */

module.exports = users
