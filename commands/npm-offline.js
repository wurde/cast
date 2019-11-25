'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process')
const meow = require('meow')
const chalk = require('chalk')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast npm-offline
`, {
  description: 'Toggle prefer-offline configuration.'
})

/**
 * Define script
 */

function npm_offline() {
  showHelp(cli)

  const res = child_process.spawnSync('npm', ['config', 'get', 'prefer-offline'], { encoding: 'utf8' })

  const toggle = (res.stdout.trim() === 'true') ? 'false' : 'true'
  
  child_process.spawnSync('npm', ['config', 'set', 'prefer-offline', toggle], { stdio: 'inherit' })

  console.log(`\nnpm config set prefer-offline ${chalk.green.bold(toggle)}`)
}

/**
 * Export script
 */

module.exports = npm_offline
