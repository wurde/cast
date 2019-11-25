'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
const { table, getBorderCharacters } = require('table')
const launchBrowser = require('../helpers/launchBrowser')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast perf URL
`, {
  description: 'Print performance metrics.'
})

/**
 * Define script
 */

async function perf({ url, filter }={}) {
  showHelp(cli, [(!url && cli.input.length < 2)])

  const targetURL = (url) ? url : cli.input[1]

  let browser
  try {
    browser = await launchBrowser()
    const page = await browser.newPage()

    // Visit target URL.
    await page.goto(targetURL)
    
    // Get performance metrics.
    await page.waitFor(1000)
    const result = await page._client.send('Performance.getMetrics')
    const performanceMetrics = result.metrics.reduce((obj, x) => {
      obj[x.name] = x.value
      return obj
    }, {})
    
    // Print performance metrics.
    if (arguments.length === 0) {
      const entries = Object.entries(performanceMetrics).map(e => [e[0], e[1]])

      // Format as a table.
      const tableConfig = {
        border: getBorderCharacters('void'),
        columnDefault: {
          paddingLeft: 2
        },
        columns: {
          0: {
            alignment: 'right'
          },
          1: {
            alignment: 'left'
          }
        }
      }
      const output = table(entries, tableConfig);

      console.log('');
      console.log(chalk.green.bold(output));
    }

    if (filter && filter in performanceMetrics) {
      return performanceMetrics[filter]
    } else {
      return performanceMetrics
    }
  } catch (err) {
    console.error('\n', chalk.bold.red(err))
  } finally {
    (browser) ? browser.close() : null
  }
}

/**
 * Export script
 */

module.exports = perf
