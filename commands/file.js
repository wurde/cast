'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const meow = require('meow')
const chalk = require('chalk')
const child_process = require('child_process')
const { table, getBorderCharacters } = require('table')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast file PATH
`, {
  description: 'Print the MIME type of a file.'
})

/**
 * Define script
 * 
 * This command looks at the MIME type of a file.
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 */

function file(path) {
  showHelp(cli, [(!path && cli.input.length < 2)])

  const filePath = path || cli.input[1]

  if (!fs.existsSync(filePath)) {
    console.error(chalk.red.bold(`\n  File does not exist: ${filePath}  \n`))
    process.exit(1)
  }

  let response = child_process.execSync(`file --mime ${filePath}`, { encoding: 'utf8' })
  response = response.split(' ').splice(1).map(e => e.trim())

  let fileInfo = { type: response[0].replace(';', '') }
  let params = response[1].split('=')

  if (response.length > 1) {
    fileInfo['parameters'] = {}
    fileInfo['parameters'][params[0]] = params[1]
  }

  if (arguments.length === 0) {
    let entries = []
    entries.push(['type', fileInfo['type']])
    
    if ('parameters' in fileInfo) {
      entries.push([params[0], params[1]])
    }

    // Format as a table.
    const tableConfig = {
      border: getBorderCharacters('void'),
      columnDefault: {
        paddingLeft: 2
      },
      columns: {
        0: {
          alignment: 'right'
        },
        1: {
          alignment: 'left'
        }
      }
    }
    const output = table(entries, tableConfig)

    console.log('')
    console.log(chalk.green.bold(output))
  }

  return fileInfo
}

/**
 * Export script
 */

module.exports = file
