/**
 * Dependencies
 */

const fse = require('fs-extra');

/**
 * Define helper
 */

function mkdir(path) {
  fse.mkdirpSync(path);
}

/**
 * Export helper
 */

module.exports = mkdir;
