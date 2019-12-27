/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');

/**
 * Define helper
 */

class Storage {
  constructor(file) {
    this.path = path.resolve(file);
  }
}

/**
 * Export helper
 */

module.exports = Storage;
