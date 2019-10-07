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
    $ cast decrypt [options] HASH

  Options
    --secret       Provide a secret.
    --nonce-path   Path to file containing nonce.
`, {
  description: 'Decryption for encrypted messages.',
  flags: {
    secret: {
      type: 'text'
    },
    noncePath: {
      type: 'text'
    }
  }
})

/**
 * Define script
 */

async function decrypt() {
  showHelp(cli, [cli.input.length < 2])
  handleInterrupt()

  const hash = cli.input[1]
  let secret = cli.flags.secret
  let noncePath = cli.flags.noncePath

  console.log('')
  let prompt_count = 0
  while (!secret || secret.length < 7) {
    const secretPrompt = await prompts({
      type: 'password',
      name: 'value',
      message: 'Please enter the secret:',
      validate: value => value.length < 7 ? 'Minimum 7 characters' : true,
      onCancel: () => {
        if (prompt_count >= 1) handleInterrupt({ force: true, code: 130 })
      }
    })
    
    prompt_count += 1
    secret = secretPrompt.value
  }
  
  prompt_count = 0
  while (!noncePath || !fs.existsSync(noncePath)) {
    const noncePrompt = await prompts({
      type: 'text',
      name: 'value',
      message: 'Please provide path to nonce:',
      validate: value => !fs.existsSync(value) ? 'File not found' : true,
      onCancel: () => {
        if (prompt_count >= 1) handleInterrupt({ force: true, code: 130 })
      }
    })

    prompt_count += 1
    noncePath = noncePrompt.value
  }
  const nonce = fs.readFileSync(noncePath)

  const spinner = ora({
    text: `Decrypting: ${hash}\n`,
    spinner: 'noise'
  }).start()

  // Key length is dependent on the algorithm. For example for aes256, it is
  // 32 bytes (256 bits / 8 bits per byte).
  const key = crypto.scryptSync(secret, 'salt', 32)
  const initialization_vector = nonce
  const decipher = crypto.createDecipheriv(ALGORITHM, key, initialization_vector)

  let decrypted = decipher.update(hash, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  setTimeout(() => {
    spinner.succeed(`Decrypted: ${hash}\n`)
    console.log(decrypted)
  }, 1000)
}

/**
 * Export script
 */

module.exports = decrypt
