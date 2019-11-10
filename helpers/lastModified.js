/**
 * Dependencies
 */

const fs = require('fs');

/**
 * Define helper
 */

function lastModified(path) {
  const stats = fs.statSync(path);
  const now = Date.now();

  return now - stats.mtime;
}

/**
 * Export helper
 */

module.exports = lastModified
