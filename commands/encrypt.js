'use strict'

/**
 * Dependencies
 */

const crypto = require('crypto')
const meow = require('meow')
const ora = require('ora')
const prompts = require('prompts')

/**
 * Constants
 */

const ALGORITHM = 'aes-256-cbc'

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast encrypt [options] MESSAGE

  Options
    --secret   Provide a secret.
`)

/**
 * Define script
 */

async function encrypt() {
  if (cli.flags.h) cli.showHelp()
  if (cli.input.length < 2) cli.showHelp()

  const message = cli.input.slice(1, cli.input.length).join(' ')
  let secret = cli.flags.secret

  console.log('')
  while (!secret || secret.length < 7) {
    const secretPrompt = await prompts({
      type: 'password',
      name: 'value',
      message: 'Please enter a secret:',
      validate: value => value.length < 7 ? 'Minimum 7 characters' : true
    })

    secret = secretPrompt.value
  }

  const spinner = ora({
    text: `Encrypting: '${message}'\n`,
    spinner: 'noise'
  }).start()

  // Key length is dependent on the algorithm. For example for aes256, it is
  // 32 bytes (256 bits / 8 bits per byte).
  const key = crypto.scryptSync(secret, 'salt', 32)
  const initialization_vector = Buffer.alloc(16, 0) //crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, key, initialization_vector)

  let encrypted = cipher.update(message, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  setTimeout(() => {
    spinner.succeed(`Encrypted: '${message}'\n`)
    console.log(encrypted)
  }, 1000)
}

/**
 * Export script
 */

module.exports = encrypt
