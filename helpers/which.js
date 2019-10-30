/**
 * Dependencies
 */

const child_process = require('child_process')

/**
 * Define helper
 */

function which(bin) {
  try {
    return child_process.execSync(`which ${bin}`, { encoding: 'utf8' })
  } catch (e) {
    return ''
  }
}

/**
 * Export helper
 */

module.exports = which
