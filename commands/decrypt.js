'use strict'

/**
 * Dependencies
 */

const crypto = require('crypto')
const meow = require('meow')
const ora = require('ora')

/**
 * Constants
 */

const ALGORITHM = 'aes-256-cbc'

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast decrypt HASH
`)

/**
 * Define script
 */

function decrypt() {
  if (cli.flags.h) cli.showHelp()
  if (cli.input.length < 2) cli.showHelp()

  const hash = cli.input[1]

  console.log('')
  const spinner = ora({
    text: `Decrypting: '${hash}'`,
    spinner: 'noise'
  }).start()

  const hash = crypto.createDecipheriv(ALGORITHM, 'secret', iv)
    .update(message)
    .digest('hex')

  setTimeout(() => {
    spinner.succeed(`Decrypted: '${message}'`)
    console.log(hash)
  }, 1000)
}

/**
 * Export script
 */

module.exports = decrypt
