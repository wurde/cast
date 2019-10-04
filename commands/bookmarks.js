'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast bookmarks
`)

/**
 * Define script
 */

function os_script() {
  showHelp(cli)

  console.log('bookmarks')
}

/**
 * Export script
 */

module.exports = os_script
