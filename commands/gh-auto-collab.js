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
    $ cast gh-auto-collab
`, {
  description: '.'
})

/**
 * Define script
 */

function gh_auto_collab() {
  showHelp(cli)
  console.log('gh_auto_collab');
}

/**
 * Export script
 */

module.exports = gh_auto_collab;
