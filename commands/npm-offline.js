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
    $ cast npm-offline
`)

/**
 * Define script
 */

function npm_offline() {
  showHelp(cli)

  console.log("npm offline")
}

/**
 * Export script
 */

module.exports = npm_offline
