'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const showHelp = require('../helpers/showHelp');
const tfjs_toxicity = require('@tensorflow-models/toxicity');

/**
 * Constant
 */

// Minimum confidence level.
const THRESHOLD = 0.9;

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast toxicity
`, {
  description: 'Detect whether text contains toxic content.'
});

/**
 * Define script
 */

async function toxicity() {
  showHelp(cli);

  const model = await tfjs_toxicity.load(THRESHOLD);

  const input = ['You are disgusting. You suck.'];

  const predictions = await model.classify(input);

  console.log('toxicity', predictions, predictions.constructor);
}

/**
 * Export script
 */

module.exports = toxicity;
