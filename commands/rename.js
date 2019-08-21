'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const prompts = require('prompts')
const micromatch = require('micromatch')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast rename [options]

    Options
    --regex, -r   Filter files via regex (Default: '*.*')
    --output, -o  Output file format (Default: '{{i}}-{{f}}').
    --force       Force overwrite of target files (Default: false).
`)

/**
 * Define script
 */

async function rename(argv) {
  if (cli.flags.h) cli.showHelp()

  let isMatch
  if (cli.flags.regex) {
    isMatch = micromatch.matcher(cli.flags.regex)
  } else {
    isMatch = micromatch.matcher('*.*')
  }

  let output
  if (cli.flags.output) {
    output = cli.flags.output
  } else {
    output = '{{i}}-{{f}}'
  }

  const files = fs.readdirSync('.').filter(file => fs.statSync(file).isFile())

  const filteredFiles = files.filter(file => isMatch(file))

  const metadataFiles = filteredFiles.map(file => {
    return {
      file: file,
      basename: path.basename(file),
      extname: path.extname(file),
      dirname: path.dirname(path.resolve(file)),
      absolute_path: path.resolve(file)
    }
  })

  for (let i = 0; i < metadataFiles.length; i++) {
    if (cli.flags.force) {
      console.log(metadataFiles[i].dirname)
      // fs.renameSync(metadataFiles[i].absolute_path, `./test2.md`)
    } else {
      if (fs.existsSync(metadataFiles[i])) { // TODO replace with target file
        const response = await prompts({
          type: 'confirm',
          name: 'force',
          message: `Target file ${metadataFiles[i].basename} exists. Overwrite? (N/y)`,
          initial: false
        })
        // if (response.force) fs.renameSync(metadataFiles[i].absolute_path, `./test2.md`)
      } else {
        // fs.renameSync(metadataFiles[i].absolute_path, `./test2.md`)
      }
    }
  }

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
