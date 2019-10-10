'use strict'

/**
 * Define Levenshtein class
 */

class Levenshtein {
  constructor(a, b) {
    this.a = a
    this.b = b
  }

  forEach(array, fn) {
    let i = -1

    while (++i < array.length) {
      fn(array[i], i, array)
    }
  }

  distance() {
    if (this.a === this.b) return 0;
    if (this.a === '') return this.b.length;
    if (this.b === '') return this.a.length;

    let current
    let matrix = []
    let previous = [0]

    this.forEach(this.a, (_, i) => { i++ , previous[i] = i })

    matrix[0] = previous

    this.forEach(this.b, (_, b_index) => {
      current = [++b_index]

      this.forEach(this.a, (_, a_index) => {
        a_index++

        if (this.a.charAt(a_index - 1) == this.b.charAt(b_index - 1))
          current[a_index] = previous[a_index - 1]
        else
          current[a_index] = Math.min(
            previous[a_index] + 1,
            current[a_index - 1] + 1,
            previous[a_index - 1] + 1
          )
      })

      previous = current
      matrix[matrix.length] = previous
    })

    return current[current.length - 1]
  }
}

 /**
 * Define helper
 */

function didYouMean(list, search) {
  if (list.constructor == String) list = list.split(' ')

  const matches = list.filter(item => {
    const l = new Levenshtein(item, search)
    if (l.distance() <= 3) return item
  })

  return matches
}

/**
 * Export helper
 */

module.exports = didYouMean
