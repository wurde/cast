'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const meow = require('meow')
const marked = require('marked')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast pdf [options] <file.md>

  Options
    --watch, -w   Automatically re-render when changes are detected (Default: false).
    --stylesheet  Path to a local style sheet with CSS.
`, {
  flags: {
    watch: {
      type: 'boolean',
      alias: 'w'
    },
    stylesheet: {
      type: 'text'
    }
  }
})

/**
 * Define script
 */

function pdf(argv) {
  if (cli.flags.h) cli.showHelp()
  if (cli.input.length < 2) cli.showHelp()
  if (!fs.existsSync(cli.input[1])) cli.showHelp()

  // TODO if cli.flags.stylesheet then apply custom CSS.
  // TODO if cli.flags.watch then use nodemon to listen for changes.
  // TODO convert markdown to pdf.

  const html = marked(fs.readFileSync(cli.input[1], 'utf8'))
  console.log(html)
}

/**
 * Export script
 */

module.exports = pdf
