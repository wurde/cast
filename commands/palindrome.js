'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
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
  const isPalindrome = word === word.split('').reverse().join('')

  if (arguments.length === 0) {
    console.log(`\n  ${chalk.green.bold(isPalindrome.toString().toUpperCase())}\n`)
  }

  return isPalindrome
}

/**
 * Export script
 */

module.exports = palindrome
