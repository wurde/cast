'use strict'

/**
 * Dependencies
 */

const sleep = require('./sleep');

/**
 * Define helper
 */

async function handleCaptcha(page) {
  let hasCaptcha = await page.$('#recaptcha') ? true : false;

  while (hasCaptcha) {
    console.error('CaptchaError: Prove you are a human.');
    await sleep(10000);
    hasCaptcha = await page.$('#recaptcha') ? true : false;
  }
}

/**
 * Export helper
 */

module.exports = handleCaptcha;
