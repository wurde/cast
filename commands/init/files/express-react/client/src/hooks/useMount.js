'use strict'

/**
 * Dependencies
 */

const React = require('react')

/**
 * Define hook
 */

const useMount = (fn, state=[]) => {
  useEffect(fn, state)
}

/**
 * Define hook
 */

module.exports = useMount
