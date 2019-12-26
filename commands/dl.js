'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const url = require('url')
const path = require('path')
const axios = require('axios')
const chalk = require('chalk')
const meow = require('meow')
const mime_types = require('mime-types')
const prompts = require('prompts')
const file = require('./file')
const showHelp = require('../helpers/showHelp')
const printError = require('../helpers/printError')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast dl URL
`, {
  description: 'Download a web resource.'
})

/**
 * Define script
 */

async function dl(targetUrl = null, fileName = null) {
  showHelp(cli)

  targetUrl = targetUrl || cli.input[1]

  if (!targetUrl) {
    console.log('')
    const userResponse = await prompts({
      type: 'text',
      name: 'value',
      message: chalk.blue.bold('Target URL:'),
      validate: value => {
        const parsedUrl = url.parse(value)
        return (!parsedUrl.hostname) ? 'Error: Invalid URL' : true
      }
    })
    console.log('')
    targetUrl = userResponse.value
  }

  try {
    // Validate the URL.
    const parsedUrl = url.parse(targetUrl)
    if (!parsedUrl.hostname) printError('Error: Invalid URL', cli)
    targetUrl = parsedUrl.href

    // Build output file path.
    let filePath
    if (fileName) {
      filePath = fileName
    } else if (parsedUrl.pathname && parsedUrl.pathname.length > 1) {
      filePath = path.basename(parsedUrl.pathname)
    } else {
      filePath = Date.now()
    }

    // Fetch resource.
    axios.get(targetUrl, { responseType: 'stream' }).then((res) => {
      // Save file locally
      const fileWrite = fs.createWriteStream(filePath)
      res.data.pipe(fileWrite)

      fileWrite.on('close', () => {  
        // Ensure a file extension exists.
        let extname = path.extname(filePath)
        if (!extname) {
          const oldPath = filePath
          const mimeType = file(filePath)

          extname = mime_types.extension(mimeType.type)
          filePath = `${filePath}.${extname}`

          fs.renameSync(oldPath, filePath)
        }

        if (arguments.length === 0) {
          console.log(chalk.green.bold(`  Downloaded: ${filePath}\n`))
        }
      })
    })
  } catch (e) {
    console.error(e)
  }
}

/**
 * Export script
 */

module.exports = dl
