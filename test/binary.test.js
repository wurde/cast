/**
 * Dependencies
 */

const binary = require('../commands/binary')

/**
 * Define assertions
 */

describe('binary.js', () => {
  test('Binary to decimal conversion', () => {
    const x = binary(['1010', '1111'], { reverse: true })
    expect(x['1010']).toBe(10)
    expect(x['1111']).toBe(15)
  })
})
