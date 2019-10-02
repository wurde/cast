'use strict'

/**
 * Define script
 */

function tldr() {
  process.argv.splice(process.argv.indexOf('/usr/bin/cast'), 1)

  if (process.argv.length === 2) {
    process.argv.push('--help')
  }

  require('tldr')
}

/**
 * Export script
 */

module.exports = tldr
