'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const marked = require('marked')
const nodemon = require('nodemon')
const puppeteer = require('puppeteer')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast pdf [options] <file.md>

  Options
    --watch, -w   Automatically re-render when changes are detected (Default: false).
    --stylesheet  Path to a local CSS style sheet.
`, {
  flags: {
    watch: {
      type: 'boolean',
      alias: 'w'
    },
    stylesheet: {
      type: 'text'
    }
  }
})

/**
 * Define helper
 */

async function setContent(page, html) {
  await page.setContent(html)
}

async function addStyleTag(page) {
  await page.addStyleTag({ content: `
    body {
      padding: 50px;
    }

    p {
      font-size: 18px;
    }
  `})

  if (cli.flags.stylesheet) {
    await page.addStyleTag({ content: fs.readFileSync(cli.flags.stylesheet, 'utf8') })
  }
}

function cleanup(browser) {
  console.log('Closing PDF render...')
  browser.close()
}

/**
 * Define script
 */

async function pdf(argv) {
  if (cli.flags.h) cli.showHelp()
  if (cli.input.length < 2) cli.showHelp()
  if (!fs.existsSync(cli.input[1])) cli.showHelp()
  if (cli.flags.stylesheet && !fs.existsSync(cli.flags.stylesheet)) cli.showHelp()

  const basename = path.basename(cli.input[1], path.extname(cli.input[1]))

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  let html = marked(fs.readFileSync(cli.input[1], 'utf8'))
  if (fs.existsSync('temp.html')) fs.unlinkSync('temp.html')
  fs.writeFileSync('temp.html', html)

  await setContent(page, html)
  await addStyleTag(page)

  if (cli.flags.watch || cli.flags.w) {
    nodemon(`--watch ${cli.input[1]} --exec echo Updating PDF...`)
    .on('start', () => {
      page.pdf({ path: `${basename}.pdf` })
    }).on('restart', files => {
      html = marked(fs.readFileSync(cli.input[1], 'utf8'))
      fs.writeFileSync('temp.html', html)
      setContent(page, html)
      if (fs.existsSync('temp.html')) fs.unlinkSync('temp.html')
    })
    .on('crash', () => cleanup(browser))
    .on('quit', () => cleanup(browser))
  } else {
    await page.pdf({ path: `${basename}.pdf` })

    browser.close()
    fs.unlinkSync('temp.html')
  }
}

/**
 * Export script
 */

module.exports = pdf
