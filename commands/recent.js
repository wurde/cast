'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process')
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
    $ cast recent DAYS
`, {
  description: 'Print most recent files.'
})

/**
 * Define script
 */

function recent() {
  showHelp(cli, [cli.input.length < 2])

  child_process.spawnSync('find', ['.', '-maxdepth', '1', '-mtime', cli.input[1]], config)
}

/**
 * Export script
 */

module.exports = recent
