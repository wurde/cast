'use strict'

/**
 * Dependencies
 */

const connectivity = require('connectivity')

/**
 * Define helper
 */

function checkConnectivity() {
  return new Promise((resolve, reject) => {
    connectivity(online => online ? resolve(true) : resolve(false))
  })
}

/**
 * Export helper
 */

module.exports = checkConnectivity
