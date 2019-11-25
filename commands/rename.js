'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const prompts = require('prompts')
const micromatch = require('micromatch')
const uuid = require('uuid')
const moment = require('moment')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast rename [options]

    Options
      --regex, -r   Filter files via regex (Default: '*.*')
      --output, -o  Output file format (Default: '{{f}}').
      --force       Force overwrite of output files (Default: false).

    Format
      {{i}}        Index: The index of the file.
      {{f}}        Filename: The original name of the file (Example: Readme.md).
      {{f+upper}}  Uppercase filename (Example: README.MD).
      {{f+lower}}  Lowercase filename (Example: readme.md).
      {{b}}        Basename: Last portion of the path (Example: Readme).
      {{e}}        Extname: The extension of the file (Example: .md).
      {{d}}        Date: The current date (Example: 2019-08-21).
      {{t}}        Time: The current time (Example: 0538).
      {{dt}}       Datetime: The current datetime (Example: 201908210538).
      {{g}}        GUID: A globally unique identifier.
`, {
  description: 'Rename files.'
})

/**
 * Define script
 */

async function rename() {
  showHelp(cli)

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
    output = '{{f}}'
  }

  const files = fs.readdirSync('.').filter(file => fs.statSync(file).isFile())
  const filteredFiles = files.filter(file => isMatch(file))

  const metadataFiles = filteredFiles.map(file => {
    return {
      file: file,
      filename: path.basename(file),
      basename: path.basename(file, path.extname(file)),
      extname: path.extname(file),
      dirname: path.dirname(path.resolve(file)),
      absolute_path: path.resolve(file)
    }
  })

  for (let i = 0; i < metadataFiles.length; i++) {
    let output_filename = output
    output_filename = output_filename.replace('{{i}}', i)
    output_filename = output_filename.replace('{{g}}', uuid.v4())
    output_filename = output_filename.replace('{{f}}', metadataFiles[i].filename)
    output_filename = output_filename.replace('{{f+upper}}', metadataFiles[i].filename.toUpperCase())
    output_filename = output_filename.replace('{{f+lower}}', metadataFiles[i].filename.toLowerCase())
    output_filename = output_filename.replace('{{b}}', metadataFiles[i].basename)
    output_filename = output_filename.replace('{{e}}', metadataFiles[i].extname)
    output_filename = output_filename.replace('{{d}}', moment(new Date()).format('YYYY-MM-DD'))
    output_filename = output_filename.replace('{{t}}', moment(new Date()).format('HHmm'))
    output_filename = output_filename.replace('{{dt}}', moment(new Date()).format('YYYYMMDDHHmm'))
    const output_path = path.join(metadataFiles[i].dirname, output_filename)

    if (cli.flags.force) {
      console.log(`Rename ${metadataFiles[i].absolute_path} to ${output_path}`)
      fs.renameSync(metadataFiles[i].absolute_path, output_path)
    } else {
      if (fs.existsSync(output_path)) {
        const response = await prompts({
          type: 'confirm',
          name: 'force',
          message: `Output file ${metadataFiles[i].basename} exists. Overwrite? (N/y)`,
          initial: false
        })
        if (response.force) {
          console.log(`Rename ${metadataFiles[i].absolute_path} to ${output_path}`)
          fs.renameSync(metadataFiles[i].absolute_path, output_path)
        }
      } else {
        console.log(`Rename ${metadataFiles[i].absolute_path} to ${output_path}`)
        fs.renameSync(metadataFiles[i].absolute_path, output_path)
      }
    }
  }
}

/**
 * Export script
 */

module.exports = rename
