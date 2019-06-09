'use strict'

/**
 * Define helper function
 */

function visit(page, url) {
  return (config = { waitUntil: "domcontentloaded" }) => page.goto(url, config)
}

/**
 * Export helper function
 */

module.exports = visit
