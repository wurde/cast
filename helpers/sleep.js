/**
 * Define helper
 */

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Export helper
 */

module.exports = sleep
