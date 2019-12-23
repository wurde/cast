/**
 * Dependencies
 */

const fse = require('fs-extra');

/**
 * Define helper
 */

function symlink(src, dst) {
  fse.ensureSymlinkSync(src, dst);
}

/**
 * Export helper
 */

module.exports = symlink;
