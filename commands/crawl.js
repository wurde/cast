'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const parseUrl = require('../helpers/parseUrl')
const launchBrowser = require('../helpers/launchBrowser')
const cheerio = require('cheerio')
const url = require('url')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast crawl URL

  Options
    --introspect    Print only links within the given URL
`, {
    description: 'Crawls websites for specific content.',
    flags: {
        introspect: {
            type: 'boolean'
        }
    }
})

/**
 * Define helpers
 */

async function launchPage() {
  const browser = await launchBrowser({
    headless: true,
    defaultViewport: {
      width: 1024,
      height: 800
    }
  })

  const page = await browser.newPage()

  return [browser, page]
}

class Queue {
  constructor() {
    this.queue = []
  }

  enqueue(value) {
    this.queue.push(value)
  }

  dequeue() {
    if (this.queue.length > 0) {
      return this.queue.shift()
    } else {
      return null
    }
  }
}

/**
* Define script
*/

async function crawl_script() {
  showHelp(cli, [cli.input.length < 2])
  const visited = new Set()

  const [browser, page] = await launchPage()
  try {
    /**
     * Visit target URL.
     */

    const rootUrl = parseUrl(cli.input[1])
    const rootHref= rootUrl.href.replace(/\/$/, '')
    await page.goto(rootHref)
    visited.add(rootHref)
    await page.waitFor(300)
    const pageContent = await page.content()

    /**
     * Parse page content.
     */
    
    const $ = cheerio.load(pageContent)
    const links = []
    $('body a').each((i, element) => {
      if (element.attribs.href) {
        const link = url.parse(element.attribs.href)
        const fullHref = rootHref + link.href
        
        // Filter out external links if --introspect is true
        if (cli.flags.introspect) {
          if (!links.includes(fullHref) && !visited.has(fullHref) && !link.hostname) {
            links.push(fullHref)
          }
        } else {
          if (link.hostname) {
            links.push(link.href)
          }
        }
      }
    })

    const q = new Queue()
    links.forEach((link) => {
      q.enqueue(link)
    })

    while (q.queue.length > 0) {
      const link = q.dequeue()
      await page.goto(link)
      visited.add(link)
      await page.waitFor(300)
      const pageContent = await page.content()
      const $ = cheerio.load(pageContent)
      const links = []
      $('body a').each((i, element) => {
        if (element.attribs.href) {
          const link = url.parse(element.attribs.href)
          const fullHref = rootHref + link.href

          // Filter out external links if --introspect is true
          if (cli.flags.introspect) {
            if (!links.includes(fullHref) && !visited.has(fullHref) && !link.hostname) {
              links.push(fullHref)
            }
          } else {
            if (link.hostname) {
              links.push(link.href)
            }
          }
        }
      })
      console.log(links, `LINK ${link}`)
      links.forEach((link) => q.enqueue(link))
    }
  } catch (error) {
    console.error(error)
  } finally {
    browser.close()
  }
}

/**
 * Export script
 */

module.exports = crawl_script
