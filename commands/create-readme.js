'use strict'

/**
 * Dependencies
 */

const path = require('path')
const meow = require('meow')
const prompts = require('prompts')
const strip_ansi = require('strip-ansi')
const chalk = require('chalk')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast create-readme
`)

/**
 * Define script
 */

async function create_readme() {
  showHelp(cli)

  let response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Project name:',
      initial: chalk.blue.bold(path.basename(process.cwd())),
      format: value => {
        return strip_ansi(value)
      }
    }
  ])

  console.log('response', response)
}

/**
 * Export script
 */

module.exports = create_readme
