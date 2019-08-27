'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const ora = require('ora')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast encrypt
`)

/**
 * Define script
 */

function encrypt() {
  if (cli.flags.h) cli.showHelp()
  if (cli.input.length < 2) cli.showHelp()

  const message = cli.input.slice(1, cli.input.length).join(' ')

  console.log('')
  const spinner = ora(`Encrypting: '${message}'`).start()

  setTimeout(() => {
    spinner.succeed(`Encrypted: '${message}'`)
  }, 1000)
}

/**
 * Export script
 */

module.exports = encrypt
