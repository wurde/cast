'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const { table } = require('table')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast file PATH
`, {
  description: 'Print the MIME type of a file.'
})

/**
 * Define script
 */

function file() {
  showHelp(cli)

  console.log('file')
}

/**
 * Export script
 */

module.exports = file
