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

const bin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'release')

/**
 * Define script
 */

function release() {
  if (!fs.existsSync(bin)) {
    console.error(chalk.red.bold('Missing binary. Run `npm install` and try again.'))
    process.exit(1)
  }
  
  if (process.argv.length === 3) {
    child_process.fork(bin, ['help'])
  } else {
    child_process.fork(bin, process.argv.slice(3, process.argv.length))
  }
}

/**
 * Export script
 */

module.exports = release
