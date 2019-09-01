#!/usr/bin/env node

'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const meow = require('meow')

/**
 * Constants
 */

const command = process.argv[2]
const script_path = path.join(__dirname, '..', 'commands', command + '.js')

/**
 * Parse args
 */

const cli = meow(`
  Usage:
    $ cast <command> [args]
  
  Commands
`)

/**
 * Check command argument exists
 */

if (!cli.input.length > 0) {
  cli.showHelp()
}

/**
 * Check script exists
 */

if (!fs.existsSync(script_path)) {
  console.error(`Missing script: ${script_path}`)
  process.exit(1)
}

/**
 * Require script
 */

const script = require(script_path)

/**
 * Run script
 */

if (script) {
  console.log(`Running script: ${script_path}`)
  script(process.argv)
} else {
  console.error(`Script is not a function.`)
  process.exit(1)
}
