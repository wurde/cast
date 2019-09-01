'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process')
const prompt = require('prompt')
const colors = require('colors')
const meow = require('meow')
const showHelpIfFlagged = require('../helpers/showHelpIfFlagged')

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

  Options
    --message, -m <message>  Commit message
`, {
  flags: {
    message: {
      type: 'string',
      alias: 'm'
    }
  }
})

/**
 * Define script
 */

function gitcommit() {
  showHelpIfFlagged([cli.flags.h], cli)

  const result = child_process.spawnSync('git', ['add', '-A'], config)

  if (result.status === 0) {
    const message = cli.flags.message

    if (!cli.flags.message) {
      prompt.get({
        name: 'message',
        description: colors.white.bold('Message'),
        required: true
      }, (err, result) => {
        child_process.spawnSync('git', ['commit', '-m', result.message], config)
      })
    } else {
      child_process.spawnSync('git', ['commit', '-m', message], config)
    }
  }
}

/**
 * Export script
 */

module.exports = gitcommit
