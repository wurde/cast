/**
 * Dependencies
 */

import React, { useState } from 'react'

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

export default useInput
