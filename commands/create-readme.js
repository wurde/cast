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
    $ cast create-readme
`)

/**
 * Define script
 */

function create_readme() {
  showHelp(cli)

  console.log("Create README")
}

/**
 * Export script
 */

module.exports = create_readme
