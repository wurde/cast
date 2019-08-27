'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const meow = require('meow')
const puppeteer = require('puppeteer')
const prompts = require('prompts')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast scrape URL
`)

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

  const chosenSelector = await prompts({
    type: 'text',
    name: 'selector',
    message: 'Enter a CSS selector to scrape the page'
  })

  // Launch the page and visit the given url
  const [browser, page] = await launchPage()
  await page.goto(cli.input[1])

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

      // Save results to output file based on user input
      fs.writeFileSync(filenamePrompt.filename, results)
    }

    // Log the results to the console
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
