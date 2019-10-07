'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const showHelp = require('../helpers/showHelp')
const printError = require('../helpers/printError')

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
 * Define script
 */

function copy() {
  showHelp(cli, [cli.input.length < 2])

  const file = cli.input[1]
  const template = path.join(TEMPLATE_DIR, file)

  if (fs.existsSync(file)) printError(`File already exists: ${path.resolve(file)}`)
  if (!fs.existsSync(template)) printError(`Missing file: ${template}`)

  console.log(`\nCopying ${file}`)
  fs.copyFileSync(template, file)
}

/**
 * Export script
 */

module.exports = copy
