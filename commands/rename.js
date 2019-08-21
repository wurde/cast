'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const micromatch = require('micromatch')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast rename [options]

    Options
    --regex, -r  Filter files via regex (Default: '*.*')
`)

/**
 * Define script
 */

async function rename(argv) {
  // Show help text.
  if (cli.flags.h) {
    cli.showHelp()
  }

  // Set regex to filter files.
  let isMatch
  if (cli.flags.regex) {
    isMatch = micromatch.matcher(cli.flags.regex)
  } else {
    isMatch = micromatch.matcher('*.*')
  }

  // Read all files in current working directory.
  const files = fs.readdirSync('.').filter(file => fs.statSync(file).isFile())

  // Filter files by regex
  const filteredFiles = files.filter(file => isMatch(file))

  // Read all of the files and extract their metadata.
  const metadataFiles = filteredFiles.map(file => {
    return {
      file: file,
      basename: path.basename(file),
      extname: path.extname(file),
      dirname: path.dirname(file)
    }
  })
  console.log(metadataFiles)

  // Rename files
  metadataFiles.forEach(file => {
    // TODO print target filename
    // TODO check if target file exists
    // if (fs.existsSync(file.basename)) {
    // fs.renameSync(`./${files[i]}`, `./${types[j]}/${files[i]}`)
  })

  // This script doesn't need to be that complicated. Write the simplest version.
  // Takes a regex to match against current directory files. Then take a format
  // to rename matched files.
  //
  // {{i}} index
  // {{f}} filename (upper|lower|camel)
  // {{e}} extname
  // {{d}} date
  // {{t}} time
  // {{dt}} datetime
  // {{g}} globally unique id

  // Add force feature. cast rename --force. By default check if output file
  // exists already to avoid overwrite fs.existSync(). Requrie a --force switch
  // to automatically overwrite results otherwise prompt yes/no.

  // Save rename function to local database (to enable "undo" functionality).

  // Add undo feature. cast rename --undo. This can be done by saving the
  // rename scripts as an array of changes:
  //   signature: '*.jpg {{f}}-{{i}}.jpg'
  //   mutations: [[/from1, /to1], [/from2, /to2]].
  // You first see a list of signatures and number of mutations for each.
  // You then pick which signature to reverse. Then it iterates over the
  // mutations and reverse the changes. Defaults to reversing the last one.
}

/**
 * Export script
 */

module.exports = rename
