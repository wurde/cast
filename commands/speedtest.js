'use strict'

/**
 * Dependencies
 */

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

/**
 * Constants
 */

const bin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'speed-test')

/**
 * Define script
 */

async function speedtest() {
  if (fs.existsSync(bin)) {
    console.error(chalk.red.bold('Missing speed-test binary. Run `npm install` and try again.'))
    process.exit(1)
  }
}

/**
 * Export script
 */

module.exports = speedtest
