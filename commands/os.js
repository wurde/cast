'use strict'

/**
 * Dependencies
 */

const os = require('os')
const meow = require('meow')
const { table } = require('table')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast os
`)

/**
 * Define script
 */

function os_script() {
  if (cli.flags.h) cli.showHelp()

  const data = [
    ['arch', os.arch()],
    ['homedir', os.homedir()],
    ['cpus', os.cpus().length],
    ['endianness', os.endianness()],
    ['freemem', os.freemem()],
  ]

  const config = {
    columns: {
      0: {
        alignment: 'right'
      },
      1: {
        alignment: 'left'
      }
    }
  }

  const output = table(data, config)

  console.log(output)
}

/**
 * Export script
 */

module.exports = os_script
