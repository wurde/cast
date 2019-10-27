/**
 * Dependencies
 */

const sleep = require('./sleep')

/**
 * Define helper
 */

async function consoleType(message, { delay }={ delay: 100 }) {
  for (i = 0; i < message.length; i++) {
    process.stdout.write(message[i])
    await sleep(delay)
  }
}

/**
 * Export helper
 */

module.exports = consoleType
