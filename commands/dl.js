'use strict'

/**
 * Dependencies
 */

const https = require('https')
const meow = require('meow')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast dl URL
`, {
  description: 'Download a web resource.'
})

/**
 * Define script
 */

function dl(url=null) {
  showHelp(cli, [(!url && cli.input.length < 2)])

  const targetUrl = url || cli.input[1]

  console.log('dl', targetUrl)
}

/**
 * Export script
 */

module.exports = dl
