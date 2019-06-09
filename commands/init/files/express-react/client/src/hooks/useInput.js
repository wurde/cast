'use strict'

/**
 * Dependencies
 */

const React = require('react')

/**
 * Constants
 */

const useState = React.useState

/**
 * Define hook
 */

const useInput = defaultValue => {
  const [value, setValue] = useState(defaultValue)

  const handleChanges = e => {
    setValue(e.target.value)
  }

  return [value, setValue, handleChanges]
}

/**
 * Export hook
 */

module.exports = useInput
