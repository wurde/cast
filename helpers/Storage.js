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
    this.data = null;
    this.load();
  }

  load() {
    if (fs.existsSync(this.path)) {
      this.data = fs.readFileSync(this.path, 'utf8');
    } else {
      fs.writeFileSync(this.path, '{}', 'utf8');
      this.data = {};
    }
  }
}

/**
 * Export helper
 */

module.exports = Storage;
