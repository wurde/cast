/**
 * Define helper
 */

function rand(min, max) {
  return Math.floor((Math.random() * max) + min);
}

/**
 * Export helper
 */

module.exports = rand;
