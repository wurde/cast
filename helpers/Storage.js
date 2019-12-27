/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');

/**
 * Define helper
 */

class Storage {
  constructor(path) {
    this.path = path;
  }
}

/**
 * Export helper
 */

module.exports = Storage;
