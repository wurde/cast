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
    $ cast crawl
`, {
    description: 'Crawls websites for specific content.'
})

/**
 * Define script
 */

function crawl_script() {
    showHelp(cli)

    console.log("crawl")
}

/**
 * Export script
 */

module.exports = crawl_script
