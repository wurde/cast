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
    $ cast gitcommit-long
`)

/**
 * Define script
 */

function gitcommit() {
  if (cli.flags.h) cli.showHelp()
  const result = child_process.spawnSync('git', ['add', '-A'], config)

  if (result.status === 0) {
    prompt.message = ''
    prompt.description = ''

    prompt.get([{
      name: 'message',
      description: colors.white.bold('Message'),
      required: true
    }, {
      name: 'description',
      description: colors.white.bold('Description (be as detailed as possible)')
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

module.exports = (argv) => {
  gitcommit()
}
