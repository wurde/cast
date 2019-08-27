'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const child_process = require('child_process')
const chalk = require('chalk')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast image
`)

/**
 * helpers
 */

function hasImageMagick() {
  try {
    child_process.execSync('which convert', { encoding: 'utf8' })
    return true
  } catch(err) {
    return false
  }
}

/**
 * Define script
 */

async function image(argv) {
  if (cli.flags.h) cli.showHelp()

  if (!hasImageMagick()) {
    console.error(chalk.red('Missing ImageMagick. Visit http://www.imagemagick.org/ for more information.'))
    process.exit(1)
  }

  require('korkut')
}

/**
 * Export script
 */

module.exports = image
