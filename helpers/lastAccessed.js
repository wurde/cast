/**
 * Dependencies
 */

const fs = require('fs');

/**
 * Define helper
 */

function lastAccessed(path) {
  const stats = fs.statSync(path);
  const now = Date.now();

  return now - stats.atimeMs;
}

/**
 * Export helper
 */

module.exports = lastAccessed
