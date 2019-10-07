'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process')
const chalk = require('chalk')
const meow = require('meow')
const showHelp = require('../helpers/showHelp')

/**
 * Constants
 */

const config = {
  cwd: process.cwd(),
  stdio: [null, 'inherit', 'inherit']
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast gp
`, {
  description: 'Update remote refs.'
})

/**
 * Define script
 */

function gp() {
  showHelp(cli)

  console.log(chalk.green.bold('\ngit pull\n'))
  child_process.spawnSync('git', ['pull'], config)

  console.log(chalk.green.bold('\ngit push\n'))
  child_process.spawnSync('git', ['push'], config)
}

/**
 * Export script
 */

module.exports = gp
