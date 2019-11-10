/**
 * Dependencies
 */

const fs = require('fs');

/**
 * Define helper
 */

function lastCreated(path) {
  const stats = fs.statSync(path);
  const now = Date.now();

  return now - stats.ctimeMs;
}

/**
 * Export helper
 */

module.exports = lastCreated
