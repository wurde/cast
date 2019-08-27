'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')

/**
 * Constants
 */

const TEMPLATE_DIR = path.join(__dirname, '..', 'templates')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast copy TEMPLATE
`)

/**
 * Define helper
 */

function print_error(message) {
  console.error(chalk.red(message))
  process.exit(1)
}

/**
 * Define script
 */

function copy() {
  if (cli.flags.h) cli.showHelp()
  if (cli.input.length < 2) cli.showHelp()

  const file = cli.input[1]
  const template = path.join(TEMPLATE_DIR, file)

  if (fs.existsSync(file)) print_error(`File already exists: ${path.resolve(file)}`)
  if (!fs.existsSync(template)) print_error(`Missing file: ${template}`)

  console.log(`\nCopying ${file}`)
  fs.copyFileSync(template, file)
}

/**
 * Export script
 */

module.exports = copy
