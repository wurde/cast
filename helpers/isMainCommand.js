/**
 * Dependencies
 */

const path = require('path');

/**
 * Define helper
 */

function isMainCommand(mod) {
  return require.main.children.includes(mod);
}

/**
 * Export helper
 */

module.exports = isMainCommand;
