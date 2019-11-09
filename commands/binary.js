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
    const ascii = []

    for (let i = 32; i <= 126; i++) {
      ascii.push(String.fromCharCode(i))
    }

    // Generate conversions
    let binaryNumbers = ascii.reduce((obj, glyph) => {
      obj[glyph] = (glyph.codePointAt() >>> 0).toString(2);
      return obj
    }, {})

    // Sort numbers in ascending order.
    let entries = Object.entries(binaryNumbers).map(e => [e[1], e[0]])
    entries.sort((a, b) => a[0] - b[0])

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

    return binaryNumbers
  } else if (options.reverse || cli.flags.reverse || cli.flags.r) {
    let argv = (numbers) ? numbers : process.argv

    // Filter for only binary numbers.
    let binaryNumbers  = argv.filter(e => Number.isInteger(e) ? e : e.match(/^[01]+$/))

    // Generate conversions
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
    showHelp(cli, [(!numbers && cli.input.length < 2)])

    let argv = (numbers) ? numbers : process.argv

    // Filter for only decimal numbers.
    let decimalNumbers = argv.filter(e =>
      Number.isInteger(e) ? e : e.match(/^\d+$/)
    );

    // Generate conversions
    let binaryNumbers = decimalNumbers.reduce((obj, d) => {
      obj[parseInt(d)] = (d >>> 0).toString(2);
      return obj
    }, {})

    // Sort numbers in ascending order.
    let entries = Object.entries(binaryNumbers).map(e => [e[1], e[0]])
    entries.sort((a, b) => a[1] - b[1])

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
  
    return binaryNumbers
  }
}

/**
 * Export script
 */

module.exports = binary
