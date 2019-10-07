'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const crypto = require('crypto')
const meow = require('meow')
const ora = require('ora')
const prompts = require('prompts')
const showHelp = require('../helpers/showHelp')
const handleInterrupt = require('../helpers/handleInterrupt')

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
`, {
  description: 'Encrypting messages.',
  flags: {
    secret: {
      type: 'text'
    }
  }
})

/**
 * Define helper
 */

function generateNonce() {
  // Static Alternatives:
  // - Buffer.alloc(16, 0)
  // - crypto.createHash('md5').update('pineapple').digest('hex').slice(0,16)
  const nonce = crypto.randomBytes(16)
  fs.writeFileSync('cipher.nonce', nonce.toString('hex'), { encoding: 'hex' })
  return nonce
}

/**
 * Define script
 */

async function encrypt() {
  showHelp(cli, [cli.input.length < 2])
  handleInterrupt()

  const message = cli.input.slice(1, cli.input.length).join(' ')
  let secret = cli.flags.secret

  console.log('')
  let prompt_count = 0
  while (!secret || secret.length < 7) {
    const secretPrompt = await prompts({
      type: 'password',
      name: 'value',
      message: 'Please enter a secret:',
      validate: value => value.length < 7 ? 'Minimum 7 characters' : true,
      onCancel: () => {
        if (prompt_count >= 1) handleInterrupt({force: true, code: 130})
      }
    })
    prompt_count += 1
    secret = secretPrompt.value
  }

  const spinner = ora({
    text: `Encrypting: '${message}'\n`,
    spinner: 'noise'
  }).start()

  // Key length is dependent on the algorithm. For example for aes256, it is
  // 32 bytes (256 bits / 8 bits per byte).
  const key = crypto.scryptSync(secret, 'salt', 32)
  const initialization_vector = generateNonce()
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
