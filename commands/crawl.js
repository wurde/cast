'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const isUrl = require('../helpers/isUrl')
const buildTargetURL = require('../helpers/buildTargetURL')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const url = require('url')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast crawl URL
`, {
    description: 'Crawls websites for specific content.'
})

/**
 * Define helpers
 */

async function launchPage() {
    const browser = await puppeteer.launch({
        headless: true,
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

async function crawl_script() {
    showHelp(cli, [cli.input.length < 2])

    const [browser, page] = await launchPage()
    try {
        const rootUrl = buildTargetURL(cli.input[1])
        await page.goto(rootUrl)
        await page.waitFor(1000)
        const pageContent = await page.content()
        const $ = cheerio.load(pageContent)
        const links = []
        $('body a').each((i, element) => {
            const a = $(this);

            if (element.attribs.href) {
                const link = url.parse(element.attribs.href)
                if (link.hostname) {
                    links.push(link.href)
                }
            }
        })
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
