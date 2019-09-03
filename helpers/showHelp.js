/**
 * Define helper
 */

function showHelp(cli, checks=[]) {
  if (cli.flags.h) cli.showHelp()
  if (checks.some((check) => check)) cli.showHelp()
}

/**
 * Export helper
 */

module.exports = showHelp
