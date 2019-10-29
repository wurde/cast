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
    $ cast palindrome WORD1 WORD2
`, {
  description: 'A palindrome checker.'
})

/**
 * Define script
 */

function palindrome() {
  showHelp(cli)

  console.log('palindrome')
}

/**
 * Export script
 */

module.exports = palindrome
