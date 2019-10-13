/**
 * Define helper
 */

async function consoleType(message) {
  for (i = 0; i < message.length; i++) {
    process.stdout.write(message[i])
    await sleep(100)
  }
}

/**
 * Export helper
 */

module.exports = consoleType
