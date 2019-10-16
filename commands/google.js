'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const scrape = require('./scrape')
const os = require('./os')
const cheerio = require('cheerio')
const chalk = require('chalk')
const cluster = require('cluster')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast google QUERY

  Options:
    --count, -c   Set limit on results. (Default: 10)
`, {
  description: 'Query Google for a list of results.',
  flags: {
    count: {
      type: 'string',
      alias: 'c'
    }
  }
})

/**
 * Define helpers
 */

Array.prototype.flatMap = function(mapperFn=x=>x, levels=1) {
  if (levels === 0) return this

  const flattenedArr = this.reduce((acc, cur) => acc.concat(mapperFn(cur)), [])

  return flattenedArr.flatMap(mapperFn, levels - 1)
}

// cb for [].prototype.filter
function hasTitleandValidLink(packagedResult) {
  const prefixedWithHttp = packagedResult.href.startsWith('http')
  return packagedResult.title && prefixedWithHttp
}

// cb for [].prototype.map
function formatResults(result) {
  const $ = cheerio.load(result)

  return {
    title: $('h3').text(),
    href: $('a').first()[0].attribs.href,
    description: $('span.st').text()
  }
}

function formatValidResults(scrapedResults) {
  return scrapedResults
    .map(formatResults)
    .filter(hasTitleandValidLink)
}

async function scrapeResults (query='', start=0) {
  return await scrape({
    url: `https://www.google.com/search?q=${query}&start=${start}`,
    selector: 'div.g'
  })
}

function printResults(results) {
  results.forEach(result => {
    console.log(chalk.green.bold(result.title))
    console.log(chalk.yellow.bold(result.href))
    console.log(result.description)
    console.log('')
  })
}

/**
 * Define script
 */

async function google(options={}, callback=a=>a) {
  showHelp(cli, [!options])
  const query = options.query || cli.input.slice(1).join(' ')

  if (cluster.isMaster) {
    const coresAvailable = os({json: true}).cpus - 1
    const specifiedCount = options.count || cli.flags.count || 10
    const limitPerWorker = Math.floor(specifiedCount / coresAvailable)
    const leftovers = specifiedCount % coresAvailable
    
    let onlyOneChildProcssForked = false
    let aggregatedResults = [] 
    let workers = []

    if (limitPerWorker < 1) {
      onlyOneChildProcssForked = true 

      workers[0] = cluster.fork()
      workers[0].send({index: 0, limit: specifiedCount, offset: 0})

      workers[0].on('message', msg => {
        aggregatedResults.push(msg)
      })
    } else { 
      for (let i = 0; i < coresAvailable; i++) {
        workers[i] = cluster.fork()
        
        const isLastProcess = i == coresAvailable - 1
        if (isLastProcess) {
          workers[i].send({index: i, limit: limitPerWorker + leftovers, offset: i * limitPerWorker})
        } else {
          workers[i].send({index: i, limit: limitPerWorker, offset: i * limitPerWorker})
        }
        
        workers[i].on('message', (msg) => {
          aggregatedResults.push(msg)
        })
      }
    }

    // every half-second, check to see if all the child processes have finished.
    const checkForEndOfAggregation = setInterval(() => {
      if (aggregatedResults.length === coresAvailable || (onlyOneChildProcssForked && aggregatedResults.length === 1 )) {
        /*
        aggregatedResults is an array of objects with this shape: { index: 1, results: [{}]}
        those objects are coming from the child processes, which are sending their position in the pool of workers (index), 
        and the results they scraped.

        We want to first sort the aggregated results by the index of each worker, because
        each worker was assigned an offset to start scraping from, and we want to preserve
        the order of the results returned from Google. 
        
        After we've sorted the results, we want to get rid of the index field that's on each object,
        and only print/return the scraped results. To do this, we have to map over each object
        sent from the workers and only return the results, which is an array. Then the aggregated results will be
        an array of arrays instead of an array of objects.

        We then want to spit out to the user one big array of 
        results, not an array of arrays of results. This is especially true of our `printResults` helper, 
        which is expecting a one-dimensional array.
        And because aggregtedResults is now an array of arrays, we need to flatten it.
        */
       
        aggregatedResults = aggregatedResults
          .sort((a,b) => a.index - b.index)
          .flatMap(result => result.results) 
         
        if (arguments.length == 0) {
          printResults(aggregatedResults)
          process.exit(0)
        } else {
          clearInterval(checkForEndOfAggregation)
          callback(aggregatedResults)
        }
      }
    }, 100)

    /*
      We can't return the complete list of aggregated results from this function since
      the return statement below executes before the interval that's checking if all the results
      are aggregated clears. That's why in the interval we invoke the callback with the final 
      results. In other words, the only way to use the aggregated results outside of this module is to 
      create a closure and set it's value inside the callback passed to this function.

      Here's an example:
        // (Inside some other module...)
        const google = require('./google')
        const myGoogleResults = []

        google({query: "Lambda School, count: 10"}, (aggregatedResults) => {
          myGoogleResults = aggregatedResulsts
        })
    */ 
   return 

  } else if (cluster.isWorker) {
    // Do the thing.

    process.on('message', (msg) => {
      // console.log(`Worker: ${msg.index} getting ${msg.limit} results. query: ${query}` )

      (async () => {
        let results = []
        let remaining = msg.limit
        let counter = msg.offset
        while (remaining > 0) {
          const scrapedResults = await scrapeResults(query, counter)
          results = results.concat(formatValidResults(scrapedResults))
          counter += scrapedResults.length
          remaining -= scrapedResults.length
          
          // trim off leftover results
          if (remaining < 0) {
            results = results.slice(0, (counter - msg.offset) + remaining)
          }
        }
        process.send({index: msg.index, results})
        process.exit(0)
      })()
    })
  }
}

/**
 * Export script
 */

module.exports = google
