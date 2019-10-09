'use strict'

/**
 * Define helper
 */

function didYouMean(list, search) {
  const matches = []

  if (list.constructor == String) list = list.split(' ')

  return matches
}

/**
 * Export helper
 */

module.exports = didYouMean
