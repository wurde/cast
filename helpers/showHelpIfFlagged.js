/**
 * Define helper
 */

function showHelpIfFlagged(checks=[], cli) {
  if (checks.some((check) => check)) cli.showHelp()
}

/**
 * Export helper
 */

module.exports = showHelpIfFlagged
