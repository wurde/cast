'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast delete-all DEST_DIR MATCH
`)

/**
 * Define script
 */

function delete_all() {
  showHelp(cli)
  console.log("Delete all")

  // Define the base case
  // Define the case where the element is a file
  // Define the case where the element is a subfolder
  // In the recursive call, change the arguments so that the function reaches the base case
  
  const pathsWithNodeModules = [
    ['code', 'lambda', 'web-applications-I', 'lambda-calc'],
    ['code', 'lambda', 'web-applications-I', 'gh-user-card'],
    ['code', 'lambda', 'web-applications-II', 'NASA-APOD'],
  ].map(path => path.join(...path)) // MS support path.join('code', 'lambda')

  for (path of pathsWithNodeModules) {
    childprocess.spawn('cd', [path])
    childprocess.spanw('rm -rf', ['node_modules'])
  }
}

/**
 * Export script
 */

module.exports = delete_all
