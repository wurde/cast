'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const url = require('url')
const meow = require('meow')
const chalk = require('chalk')
const prompts = require('prompts')
const puppeteer = require('puppeteer')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast scrape URL
`)

/**
 * Define helper
 */

function print_error(message) {
  console.error(chalk.red(message))
  cli.showHelp()
}

/**
 * Launch Page
 */

async function launchPage() {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1024,
      height: 800
    }
  })
  const page = await browser.newPage()

  return [browser, page]
}

/**
 * Define script
 */

async function scrape() {
  if (cli.flags.h) cli.showHelp()
  if (!cli.input[1]) cli.showHelp()

  const targetURL = url.parse(cli.input[1])
  if (!targetURL.hostname) print_error('Error: Invalid URL')

  const chosenSelector = await prompts({
    type: 'text',
    name: 'selector',
    message: 'Enter a CSS selector to scrape the page'
  })

  const [browser, page] = await launchPage()
  await page.goto(targetURL)

  try {
    const results = await page.evaluate(selector => {
      return Array.from(document.querySelectorAll(selector))
             .map(el => el.innerHTML)
    }, chosenSelector.selector)

    const saveFilePrompt = await prompts({
      type: 'confirm',
      name: 'saveFile',
      initial: true,
      message: 'Do you want to save the results to a file? (Y/n)'
    })

    if (saveFilePrompt.saveFile) {
      const filenamePrompt = await prompts({
        type: 'text',
        name: 'filename',
        message: 'Enter the filename you\'d like to save to',
      })

      fs.writeFileSync(filenamePrompt.filename, results)
    }

    console.log('results:', results)
  } catch(err) {
    console.error(err)
  } finally {
    browser.close()
  }
}

/**
 * Export script
 */

module.exports = scrape
