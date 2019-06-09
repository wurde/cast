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
  let result = child_process.spawnSync('git', ['add', '-A'], config)

  if (result.status === 0) {
    prompt.message = ''

    prompt.get({
      name: 'message',
      description: colors.white.bold('Message'),
      required: true
    }, (err, result) => {
      const msg = result.message || 'Save changes.'

      child_process.spawnSync('git', ['commit', '-m', msg], config)
    })
  }
}

/**
 * Export script
 */

module.exports = (argv) => {
  gitcommit()
}
