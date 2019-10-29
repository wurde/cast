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

async function groups(usernameInput=null) {
  showHelp(cli)
  let username = ''

  if (usernameInput) {
    username = usernameInput
  } else if (cli.input.length > 1) {
    username = cli.input[1]
  }

  try {
    const groupsList = await child_process.execSync(`groups ${username}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim().split(' ').slice(2)

    if (arguments.length === 0) {
      console.log(`\n  ${chalk.green.bold(groupsList.join(' '))}\n`)
    }

    return groupsList
  } catch (err) {
    console.error(`No such user '${username}'`)
  }
}

/**
 * Export script
 */

module.exports = groups
