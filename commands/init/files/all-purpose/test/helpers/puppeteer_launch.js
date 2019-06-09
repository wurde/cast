'use strict'

/**
 * Dependencies
 */

const puppeteer = require('puppeteer')

/**
 * Constants
 */

const default_config = {
  headless: true,
  slowMo: 0,
  defaultViewport: {
    width: 600,
    height: 800,
    isMobile: false,
    hasTouch: false,
    isLandscape: false
  },
  timeout: 30000 // 30 sec
}

/**
 * Define test helper
 */

function puppeteer_launch(config = default_config) {
  return puppeteer.launch(config)
}

/**
 * Export test helper
 */

module.exports = puppeteer_launch
