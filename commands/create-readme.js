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
 * Constants
 */

const responseNames = [
  'projectName',
  'projectDescription',
  'hasGettingStarted',
  'hasExamples',
  'licenseName',
  'licenseUrl'
]

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast create-readme
`)

/**
 * Define helper
 */

function requireAllResponses(response) {
  const keys = Object.keys(response)
  const hasResponses = responseNames.every(x => keys.includes(x))

  if (hasResponses) {
    return true
  } else {
    console.log(chalk.red.bold('Cancelled README.md generation.\n'))
    process.exit(130)
  }
}

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
    },
    {
      type: 'text',
      name: 'projectDescription',
      message: 'Project description:'
    },
    {
      type: 'confirm',
      name: 'hasGettingStarted',
      message: 'Add "Getting started" section?',
      initial: true,
      onRender() {
        this.yesOption = chalk.blue.bold(this.yesOption)
      }
    },
    {
      type: 'confirm',
      name: 'hasExamples',
      message: 'Add "Examples" section?',
      initial: true,
      onRender() {
        this.yesOption = chalk.blue.bold(this.yesOption)
      }
    },
    {
      type: 'text',
      name: 'licenseName',
      message: 'License name:',
      initial: chalk.blue.bold('MIT'),
      format: value => {
        return strip_ansi(value)
      }
    },
    {
      type: 'text',
      name: 'licenseUrl',
      message: 'License url:',
      initial: chalk.blue.bold('LICENSE.md'),
      format: value => {
        return strip_ansi(value)
      }
    },
  ])

  requireAllResponses(response)
}

/**
 * Export script
 */

module.exports = create_readme
