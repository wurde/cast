'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
const { table, getBorderCharacters } = require('table')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast binary [OPTION]... NUMBER

  Options:
    --reverse, -r  Convert binary to decimal.
    --ascii        Print table of ASCII characters in binary.
`, {
  description: 'Convert decimal to binary.'
})

/**
 * Define script
 */

function binary(numbers=null, options={}) {
  if (options.ascii || cli.flags.ascii) {
    // Print conversion table for all ASCII characters.
    // TODO
  } else if (options.reverse || cli.flags.reverse || cli.flags.r) {
    let argv = (numbers) ? numbers : process.argv

    // Filter for only binary numbers.
    let binaryNumbers  = argv.filter(e => e.match(/^[01]+$/))
    let decimalNumbers = binaryNumbers.reduce((obj,b) => {
      obj[b] = parseInt(parseInt(b, 2).toString(10));
      return obj
    }, {})

    // Sort numbers in ascending order.
    let entries = Object.entries(decimalNumbers)
    entries.sort((a,b) => a[1] - b[1])

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
    
    // Print table or return object.
    if (arguments.length === 0) {
      console.log('')
      console.log(chalk.green.bold(output))
    }

    return decimalNumbers
  } else {
    showHelp(cli, [cli.input.length < 2])

    const decimalNumber = cli.input[1]
    const binaryNumber = (decimalNumber >>> 0).toString(2)

    if (arguments.length === 0) {
      console.log(`\n  ${chalk.green.bold(binaryNumber)}\n`)
    }
  
    return binaryNumber
  }
}

/**
 * Export script
 */

module.exports = binary
