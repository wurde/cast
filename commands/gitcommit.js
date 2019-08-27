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
 * Define script
 */

function gitcommit() {
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

module.exports = (argv) => {
  gitcommit()
}
