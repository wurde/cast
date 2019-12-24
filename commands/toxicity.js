'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const tf = require('@tensorflow/tfjs-node');
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
  // TODO toxicity
  // TODO identity_attack
  // TODO insult
  // TODO severe_toxicity
  // TODO obscene
  // TODO sexual_explicit
  // TODO threat
  console.log(results);
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast toxicity INPUT

  Options:
    -t, --threshold N   Minimum confidence level 0..1 (Default 0.9)
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
    prettyPrintResults(predictions);
  }

  return predictions;
}

/**
 * Export script
 */

module.exports = toxicity;
