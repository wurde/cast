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

    const [browser, page] = await launchPage()
    try {
        const rootUrl = buildTargetURL(cli.input[1])
        await page.goto(rootUrl)
        await page.waitFor(1000)
        const pageContent = await page.content()
        const $ = cheerio.load(pageContent)
        const links = []
        $('body a').each((i, element) => {

            if (element.attribs.href) {
                const link = url.parse(element.attribs.href)
                if (link.hostname) {
                    links.push(link.href)
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
            await page.waitFor(1000)
            const pageContent = await page.content()
            const $ = cheerio.load(pageContent)
            const links = []
            $('body a').each((i, element) => {

                if (element.attribs.href) {
                    const link = url.parse(element.attribs.href)
                    if (link.hostname) {
                        links.push(link.href)
                    }
                }
            })
            console.log(links, `LINK ${link}`)
            links.forEach((link) => {
                q.enqueue(link)
            })
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
