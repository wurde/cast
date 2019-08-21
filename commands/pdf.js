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

async function render_page(html) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(html)
  return [browser, page]
}

async function style_page(page) {
  if (cli.flags.stylesheet) {
    page.addStyleTag({ content: fs.readFileSync(cli.flags.stylesheet) })
  } else {
    // TODO apply default styles
  }
  return page
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

  const html = marked(fs.readFileSync(cli.input[1], 'utf8'))
  fs.writeFileSync('temp.html', html)
  
  if (cli.flags.watch || cli.flags.w) {
    nodemon(`--watch temp.html --exec echo Updating PDF...`)

    nodemon.on('start', async () => {
      console.log('App has started')
      let [browser, page] = await render_page(html)
      page = await style_page(html)
      await page.pdf({ path: `${basename}.pdf` })
      }).on('quit', () => {
      console.log('App has quit')
      browser.close()
      fs.unlinkSync('temp.html')
    }).on('restart', (files) => {
      process.exit()
      console.log('App restarted due to: ', files)
    })
  } else {
    let [browser, page] = await render_page(html)
    page = await style_page(html)
    await page.pdf({ path: `${basename}.pdf` })
    
    browser.close()
    fs.unlinkSync('temp.html')
  }
}

/**
 * Export script
 */

module.exports = pdf
