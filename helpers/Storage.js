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
    return this.trap();
  }

  load() {
    if (fs.existsSync(this.path)) {
      this.data = JSON.parse(fs.readFileSync(this.path, 'utf8'));
    } else {
      fs.writeFileSync(this.path, '{}', 'utf8');
      this.data = {};
    }
  }

  trap() {
    return this.watch(this.data, () => {
      process.nextTick(() => {
        fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2), 'utf8');
      });
    });
  }

  watch(target, callback) {
    const handler = {};

    handler.get = (target, property, receiver) => {
      try {
        return new Proxy(target[property], handler);
      } catch (error) {
        return Reflect.get(target, property, receiver);
      }
    };

    handler.set = (target, property, value) => {
      callback();
      return Reflect.set(target, property, value);
    };

    handler.deleteProperty = (target, property) => {
      callback();
      return Reflect.deleteProperty(target, property);
    };

    return new Proxy(target, handler);
  }
}

/**
 * Export helper
 */

module.exports = Storage;
