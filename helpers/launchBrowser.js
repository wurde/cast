'use strict'

/**
 * Dependencies
 */

const puppeteer = require('puppeteer')

/**
 * Define helper
 */

async function launchBrowser(config=null) {
  if (!config) {
    config = {
      headless: true,
      defaultViewport: {
        width: 1024,
        height: 800
      }        
    }
  }

  const browser = await puppeteer.launch(config)

  return browser
}

/**
 * Export helper
 */

module.exports = launchBrowser
