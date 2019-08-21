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
    $ cast rename

    Options
    --regex, -r  Filter files via regex (Default: '*.*')
`)

/**
 * Define script
 */

async function rename(argv) {
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

  // Use fs module for renaming files.
  // fs.renameSync(`./${files[i]}`, `./${types[j]}/${files[i]}`)

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
