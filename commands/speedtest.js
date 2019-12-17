'use strict'

/**
 * Dependencies
 */

const execBin = require('../helpers/execBin');

/**
 * Define script
 */

async function speedtest() {
  execBin('speed-test');
}

/**
 * Export script
 */

module.exports = speedtest;
