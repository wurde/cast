'use strict'

/**
 * Define Levenshtein class
 */

class Levenshtein {
  constructor(a, b) {
    this.a = a
    this.b = b
  }

  distance() {
    if (this.a === this.b) return 0;
    if (this.a === '') return this.b.length;
    if (this.b === '') return this.a.length;

    return 1
  }
}

 /**
 * Define helper
 */

function didYouMean(list, search) {
  const matches = []

  if (list.constructor == String) list = list.split(' ')

  list.map(item => {
    const l = new Levenshtein(item, search)
    console.log(`${item} ${search} ${l.distance()}`)

    if (l.distance() <= 3) {
      return item
    } else {
      return null
    }
  })

  return matches
}

/**
 * Export helper
 */

module.exports = didYouMean
