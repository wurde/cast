'use strict'

/**
 * Dependencies
 */

const chalk = require('chalk')
const connectivity = require('connectivity')

/**
 * Define helpers
 */

function checkConnectivity() {
  return new Promise((resolve, reject) => {
    connectivity(online => online ? resolve(true) : resolve(false))
  })
}

async function requireConnectivity() {
  const is_connected = await checkConnectivity()

  if (is_connected === false) {
    console.error(chalk.red('Error: There is no Internet connection.'))
    process.exit(1)
  }
}

/**
 * Export helpers
 */

module.exports = {
  checkConnectivity,
  requireConnectivity
}
