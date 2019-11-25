'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
const binary = require('./binary')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast hamming NUMBER1 NUMBER2
`, {
  description: 'Calculate the hamming distance.'
})

/**
 * Define script
 */

function hamming(n1=null, n2=null) {
  showHelp(cli, [((!n1 && !n2) && cli.input.length < 3)]);

  n1 = (n1 && n2) ? n1 : cli.input[1];
  n2 = (n1 && n2) ? n2 : cli.input[2];
  const binaryInput = binary([n1, n2]);
  const binaryN1 = parseInt(binaryInput[n1], 2);
  const binaryN2 = parseInt(binaryInput[n2], 2);
  const xor = ((binaryN1 ^ binaryN2) >>> 0).toString(2);
  const bits = xor.replace(/0/g, '');
  const hammingDistance = bits.length;

  if (arguments.length === 0) {
    console.log(
      '\n  ',
      chalk.white.bold(`Hamming distance between ${n1} and ${n2} is`),
      `${chalk.green.bold(hammingDistance)}.\n`
    );
  }

  return hammingDistance;
}

/**
 * Export script
 */

module.exports = hamming
