'use strict'

/**
 * Dependencies
 */

const puppeteer = require('puppeteer')

/**
 * Define test helper
 */

function init_page() {
  return puppeteer.launch().then(async browser => browser.newPage())
}

/**
 * Export test helper
 */

module.exports = init_page
