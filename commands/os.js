'use strict'

/**
 * Dependencies
 */

const os = require('os')
const meow = require('meow')
const moment = require('moment')
const filesize = require('filesize')
const { table } = require('table')
const showHelp = require('../helpers/showHelp')

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
  showHelp(cli, [cli.flags.h])

  const data = [
    ['arch', os.arch()],
    ['homedir', os.homedir()],
    ['tmpdir', os.tmpdir()],
    ['cpus', os.cpus().length],
    ['endianness', os.endianness()],
    ['freemem', filesize(os.freemem())],
    ['totalmem', filesize(os.totalmem())],
    ['hostname', os.hostname()],
    ['networkInterfaces', Object.keys(os.networkInterfaces()).join(', ')],
    ['platform', os.platform()],
    ['release', os.release()],
    ['type', os.type()],
    ['uptime', moment.duration(os.uptime(), 'seconds').humanize()],
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
