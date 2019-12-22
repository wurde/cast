'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const printError = require('../helpers/printError')

/**
 * Constants
 */

const DATA_DIR = path.join(__dirname, '..', 'data')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast template NAME
`, {
  description: 'Copy template files.'
})

/**
 * Define script
 */

function template() {
  showHelp(cli, [cli.input.length < 2])

  const file = cli.input[1]
  const template = path.join(DATA_DIR, file)

  if (fs.existsSync(file)) printError(`File already exists: ${path.resolve(file)}`)
  if (!fs.existsSync(template)) printError(`Missing file: ${template}`)

  console.log(`\nCopying ${file}`)
  fs.copyFileSync(template, file)
}

/**
 * Export script
 */

module.exports = template
