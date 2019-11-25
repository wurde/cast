'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process')
const prompt = require('prompt')
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
    $ cast gitcommit-long
`, {
  description: 'Create a git commit.'
})

/**
 * Define script
 */

function gitcommit() {
  showHelp(cli)

  const result = child_process.spawnSync('git', ['add', '-A'], config)

  if (result.status === 0) {
    prompt.message = ''
    prompt.description = ''

    prompt.get([{
      name: 'message',
      description: chalk.white.bold('Message'),
      required: true
    }, {
      name: 'description',
      description: chalk.white.bold('Description (be as detailed as possible)')
    }], (err, result) => {
        let args = ['commit', '-m', result.message]

        if (result.description) { args = args.concat(['-m', result.description]) }

        child_process.spawnSync('git', args, config)
      }
    )
  }
}

/**
 * Export script
 */

module.exports = gitcommit
