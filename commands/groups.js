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
    $ cast groups [USERNAME]
`, {
  description: 'Print groups a user belongs to.'
})

/**
 * Define script
 */

async function groups() {
  showHelp(cli)

  const groupsList = await child_process.execSync('groups', { encoding: 'utf8' }).split(' ')

  if (arguments.length === 0) {
    console.log(`\n  ${chalk.green.bold(groupsList.join(' '))}`)
  }

  return groupsList
}

/**
 * Export script
 */

module.exports = groups
