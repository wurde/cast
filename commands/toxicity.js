'use strict'

/**
 * Dependencies
 */

require('@tensorflow/tfjs-node');
const meow = require('meow');
const chalk = require('chalk');
const tfjs_toxicity = require('@tensorflow-models/toxicity');
const showHelp = require('../helpers/showHelp');
const isMainCommand = require('../helpers/isMainCommand');

/**
 * Constant
 */

// Minimum confidence level.
const THRESHOLD = 0.9;

/**
 * Define helpers
 */

function prettyPrintResults(results) {
  console.log('');

  for (let i = 0; i < results.length; i++) {
    const label = results[i].label;
    const match = results[i].results[0].match;
    const color = match === true ? 'red' : 'white';
    const spacing = '.'.repeat(18 - label.length);

    console.log(`    ${label}${spacing}${chalk[color].bold(match)}`);
  }

  console.log('');
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast toxicity INPUT

  Options:
    -t, --threshold N    Minimum confidence level 0..1 (Default 0.9)
`, {
  description: 'Detect whether text contains toxic content.',
  flags: {
    threshold: {
      type: 'string',
      alias: 't'
    }
  }
});

/**
 * Define script
 */

async function toxicity(input, threshold = null) {
  showHelp(cli, [!input && cli.input.length < 2]);

  input = input || cli.input.slice(1).join(' ');
  threshold = Number(threshold || cli.flags.threshold ||  THRESHOLD);

  const model = await tfjs_toxicity.load(threshold);

  const predictions = await model.classify([input]);

  if (isMainCommand(module)) {
    console.log(`\n  ${chalk.white.bold(input)}`);
    prettyPrintResults(predictions);
  }

  return predictions;
}

/**
 * Export script
 */

module.exports = toxicity;
