'use strict'

/**
 * Define test helper
 */

async function hesitate(page, options={}) {
  let delay

  if (Number.isInteger(options.delay)) {
    delay = Math.abs(options.delay)
  } else if (Number.isInteger(options.max) && Number.isInteger(options.min)) {
    delay = Math.floor(Math.random() * Math.abs(options.max - options.max)) + Math.abs(options.min)
  } else {
    delay = Math.floor(Math.random() * 700) + 300
  }

  await page.waitFor(delay)

  return true
}

/**
 * Export test helper
 */

module.exports = hesitate
