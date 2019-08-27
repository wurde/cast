'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process')
const prompt = require('prompt')
const colors = require('colors')
const meow = require('meow')

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
    $ cast gitcommit
`)

/**
 * Define script
 */

function gitcommit() {
  if (cli.flags.h) cli.showHelp()

  const result = child_process.spawnSync('git', ['add', '-A'], config)

  if (result.status === 0) {
    prompt.message = ''

    prompt.get({
      name: 'message',
      description: colors.white.bold('Message'),
      required: true
    }, (err, result) => {
      child_process.spawnSync('git', ['commit', '-m', result.message], config)
    })
  }
}

/**
 * Export script
 */

module.exports = gitcommit
