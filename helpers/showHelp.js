/**
 * Define helper
 */

function showHelp(cli, checks=[]) {
  if (checks.length === 0) cli.showHelp()
  if (checks.some((check) => check)) cli.showHelp()
}

/**
 * Export helper
 */

module.exports = showHelp
