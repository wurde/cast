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
    $ cast delete-all DEST_DIR MATCH
`)

/**
 * Define script
 */

function delete_all() {
  showHelp(cli)
  console.log("Delete all")
}

/**
 * Export script
 */

module.exports = delete_all
