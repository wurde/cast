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

  Options:
    --json   Return information in JSON format.
`, {
  description: 'Print operating system information.',
  flags: {
    json: {
      type: 'boolean',
    }
  }
})

/**
 * Define script
 */

function os_script() {
  showHelp(cli)

  const data = {
    'arch': os.arch(),
    'homedir': os.homedir(),
    'tmpdir': os.tmpdir(),
    'cpus': os.cpus().length,
    'endianness': os.endianness(),
    'freemem': filesize(os.freemem()),
    'totalmem': filesize(os.totalmem()),
    'hostname': os.hostname(),
    'networkInterfaces': Object.keys(os.networkInterfaces()).join(', '),
    'platform': os.platform(),
    'release': os.release(),
    'type': os.type(),
    'uptime': moment.duration(os.uptime(), 'seconds').humanize(),
  }

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

  const output = table(Object.entries(data), config)

  if (arguments.length === 0) {
    if (cli.flags.json) {
      console.log(data)
    } else {
      console.log(output)
    }
  }

  return data
}

/**
 * Export script
 */

module.exports = os_script
