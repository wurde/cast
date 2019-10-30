/**
 * Dependencies
 */

const child_process = require('child_process')
const which = require('../helpers/which')

/**
 * Constants
 */

const hasPidof = which('pidof')

/**
 * Define helper
 */

function pidof(bin) {
  try {
    if (hasPidof) {
      return child_process.execSync(`pidof ${bin}`, { encoding: 'utf8' }).trim()
    } else {
      return null
    }
  } catch (e) {
    return null
  }
}

/**
 * Export helper
 */

module.exports = pidof
