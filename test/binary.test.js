/**
 * Dependencies
 */

const binary = require('../commands/binary')

/**
 * Define assertions
 */

describe('binary.js', () => {
  test('Decimal to binary conversion', () => {
    const x = binary(['4', '64', '256'])
    expect(x[4]).toBe('100')
    expect(x[64]).toBe('1000000')
    expect(x[256]).toBe('100000000')
  })

  test('Binary to decimal conversion', () => {
    const x = binary(['1010', '1111'], { reverse: true })
    expect(x['1010']).toBe(10)
    expect(x['1111']).toBe(15)
  })
})
