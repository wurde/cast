'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast delete-all MATCH

  Options:
    --destination, -d DIR   Destination to start removal.
`, {
  flags: {
    destDir: {
      type: 'string',
      alias: 'd'
    }
  }
})

/**
 * Define script
 */

function delete_all() {
  showHelp(cli, [cli.input.length < 2])
  
  const destDir = path.resolve(cli.flags.destDir || '.')

  console.log(`\nAre you sure you want to delete? ${chalk.red.bold(cli.input[1])} from ${chalk.green.bold(path.resolve(destDir))}`)
  // TODO prompt user for confirmation
  
  // Define the base case
  // Define the case where the element is a file
  // Define the case where the element is a subfolder
  // In the recursive call, change the arguments so that the function reaches the base case

  
  function buildPaths(root, match) {    
  }
  
  // const pathsWithNodeModules = [
  //   ['code', 'lambda', 'web-applications-I', 'lambda-calc'],
  //   ['code', 'lambda', 'web-applications-I', 'gh-user-card'],
  //   ['code', 'lambda', 'web-applications-II', 'NASA-APOD'],
  // ].map(path => path.join(...path)) // MS support path.join('code', 'lambda')

  // for (path of pathsWithNodeModules) {
  //   childprocess.spawn('cd', [path])
  //   childprocess.spanw('rm -rf', ['node_modules'])
  // }
}

/**
 * Export script
 */

module.exports = delete_all
