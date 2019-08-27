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
    $ cast encrypt MESSAGE
`)

/**
 * Define script
 */

function encrypt() {
  if (cli.flags.h) cli.showHelp()
  if (cli.input.length < 2) cli.showHelp()

  const message = cli.input.slice(1, cli.input.length).join(' ')

  console.log('')
  const spinner = ora({
    text: `Encrypting: '${message}'`,
    spinner: 'noise'
  }).start()

  const key = crypto.scryptSync('secret', 'salt', 24)
  console.log('key', key)

  const initialization_vector = crypto.randomBytes(16)
  console.log('initialization_vector', initialization_vector)

  // const cipher = crypto.createCipheriv(ALGORITHM, key, initialization_vector)
  //   // .update(message)
  //   // .digest('hex')
  // console.log('cipher', cipher)

  setTimeout(() => {
    spinner.succeed(`Encrypted: '${message}'`)
    console.log(hash)
  }, 1000)
}

/**
 * Export script
 */

module.exports = encrypt
