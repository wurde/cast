'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast cwd
`, {
  description: 'Print current working directory.'
})

/**
 * Define script
 */

function cwd(options=null) {
  showHelp(cli)

  const cwd = process.cwd()

  if (arguments.length == 0) {
    console.log(chalk.green.bold('\n', cwd, '\n'))
  }

  return cwd
}

/**
 * Export script
 */

module.exports = cwd
