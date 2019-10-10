'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process')
const meow = require('meow')
const chalk = require('chalk')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast image
`, {
  description: 'Format images.'
})

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

async function image() {
  showHelp(cli)

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
