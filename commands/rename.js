'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
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
  // Set default for regex argument.
  let isMatch
  if (cli.flags.regex) {
    isMatch = micromatch.matcher(cli.flags.regex)
  } else {
    isMatch = micromatch.matcher('*.*')
  }

  // Read all files in current working directory.
  let files = fs.readdirSync('.').filter(file => fs.statSync(file).isFile())

  // Filter files by regex
  files = files.filter(file => {
    console.log('Match file', file, isMatch(file))
    isMatch(file)
  })

  // Read all of the files and extract their metadata.

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

  // Use prompts to get the regex file matcher and the output format.

  // - extname: path.extname(files[i])

  // Use fs module for renaming files.
  // fs.renameSync(`./${files[i]}`, `./${types[j]}/${files[i]}`)

  // Add force feature. cast rename --force. By default check if output file
  // exists already to avoid overwrite fs.existSync(). Requrie a --force switch
  // to automatically overwrite results otherwise prompt yes/no.

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
