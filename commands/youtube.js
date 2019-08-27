'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const url = require('url')
const meow = require('meow')
const ytdl_core = require('ytdl-core')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast youtube
`)

/**
 * Define script
 */

function youtube() {
  if (cli.flags.h) cli.showHelp()
  if (cli.input.length < 2) cli.showHelp()

  const link = cli.input[1]
  const youtube_url = url.parse(link)

  ytdl_core(link).pipe(fs.createWriteStream(`${(youtube_url.query || 'youtube')}.flv`))
}

/**
 * Export script
 */

module.exports = youtube
