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
    $ cast palindrome WORD
`, {
  description: 'A palindrome checker.'
})

/**
 * Define script
 */

function palindrome(word=null) {
  showHelp(cli, [(!word && cli.input.length < 2)])

  word = (word) ? word : cli.input[1]

  return word === word.split('').reverse().join('')
}

/**
 * Export script
 */

module.exports = palindrome
