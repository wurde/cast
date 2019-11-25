'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const path = require('path')
const chalk = require('chalk')
const prompts = require('prompts')
const fs = require('fs')
const child_process = require('child_process')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast delete-all MATCH

  Options:
    --destination, -d DIR   Destination to start removal.
`, {
  description: 'Remove all matching files.',
  flags: {
    destination: {
      type: 'string',
      alias: 'd'
    }
  }
})

/**
 * Define script
 */

async function delete_all() {
  showHelp(cli, [cli.input.length < 2])
  
  const destDir = path.resolve(cli.flags.destination || '.')

  const confirmPrompt = await prompts({
    type: 'confirm',
    name: 'value',
    message: `Are you sure you want to delete? ${chalk.red.bold(cli.input[1])} from ${chalk.green.bold(destDir)} [N/y]`,
    initial: false
  })
  if (!confirmPrompt.value) process.exit(1)

  const matches = []
  buildPaths(destDir, cli.input[1])
  
  function buildPaths(fromDir, match) {
    const files = fs.readdirSync(fromDir, { withFileTypes: true })

    return files.forEach(file => {
      if (file.name === match) {
        console.log('removing:', file.name)
        matches.push(path.resolve(fromDir, file.name))
      } else if (file.isDirectory()) {
        return buildPaths(path.resolve(fromDir, file.name), match)
      }
    })
  }

  child_process.spawn('rm', ['-rf', ...matches])
}

/**
 * Export script
 */

module.exports = delete_all
