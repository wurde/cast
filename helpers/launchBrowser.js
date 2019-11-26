'use strict'

/**
 * Dependencies
 */

const puppeteer = require('puppeteer');

/**
 * Define helper
 */

async function launchBrowser(config = {
  headless: true,
  defaultViewport: {
    width: 1024,
    height: 800
  }
}) {
  return await puppeteer.launch(config);
}

/**
 * Export helper
 */

module.exports = launchBrowser;
