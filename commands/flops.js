'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const chalk = require('chalk');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast flops
`, {
  description: 'Print a reference table for FLOPS.'
})

/**
 * Define script
 */

function flops() {
  showHelp(cli)
  console.log(`
${chalk.white.bold('Floating point operations per second (FLOPS):')}

  kiloFLOPS	kFLOPS   ${chalk.green.bold('10^3')}
  megaFLOPS	MFLOPS   ${chalk.green.bold('10^6')}
  gigaFLOPS	GFLOPS   ${chalk.green.bold('10^9')}
  teraFLOPS	TFLOPS   ${chalk.green.bold('10^12')}
  petaFLOPS	PFLOPS   ${chalk.green.bold('10^15')}
  exaFLOPS	EFLOPS   ${chalk.green.bold('10^18')}
  zettaFLOPS	ZFLOPS   ${chalk.green.bold('10^21')}
  yottaFLOPS	YFLOPS   ${chalk.green.bold('10^24')}
`);
}

/**
 * Export script
 */

module.exports = flops
