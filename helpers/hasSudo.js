/**
 * Define helper
 */

function hasSudo() {
  return process.getuid() === 0
}

/**
 * Export helper
 */

module.exports = hasSudo
