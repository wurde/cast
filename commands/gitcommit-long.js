'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process')
const prompt = require('prompt')
const colors = require('colors')

/**
 * Constants
 */

const config = {
  cwd: process.cwd(),
  stdio: [null, 'inherit', 'inherit']
}

/**
 * Define script
 */

function gitcommit() {
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
        const args = ['commit', '-m', result.message]

        if (result.description) { args.concat(['-m', result.description]) }

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
