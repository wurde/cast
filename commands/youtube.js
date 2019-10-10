'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const url = require('url')
const meow = require('meow')
const ytdl_core = require('ytdl-core')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast youtube
`, {
  description: 'Download YouTube videos.'
})

/**
 * Define script
 */

function youtube() {
  showHelp(cli, [cli.input.length < 2])

  const link = cli.input[1]
  const youtube_url = url.parse(link)

  ytdl_core(link).pipe(fs.createWriteStream(`${(youtube_url.query || 'youtube')}.flv`))
}

/**
 * Export script
 */

module.exports = youtube
