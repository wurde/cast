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

function palindrome(word1=null, word2=null) {
  showHelp(cli, [((!word1 || !word2) && cli.input.length < 3)])

  word1 = (word1) ? word1 : cli.input[1]
  word2 = (word2) ? word2 : cli.input[2]

  console.log('word1', word1)
  console.log('word2', word2)
}

/**
 * Export script
 */

module.exports = palindrome
