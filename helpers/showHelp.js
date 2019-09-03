/**
 * Define helper
 */

function showHelp(checks=[], cli) {
  if (checks.some((check) => check)) cli.showHelp()
}

/**
 * Export helper
 */

module.exports = showHelp
