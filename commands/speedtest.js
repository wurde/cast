'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const chalk = require('chalk')

/**
 * Constants
 */

const bin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'speed-test')

/**
 * Define script
 */

async function speedtest() {
  if (!fs.existsSync(bin)) {
    console.error(chalk.red.bold('Missing binary. Run `npm install` and try again.'))
    process.exit(1)
  }

  child_process.fork(bin)
}

/**
 * Export script
 */

module.exports = speedtest
