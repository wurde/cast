/**
 * Dependencies
 */

import React from 'react'

/**
 * Define hook
 */

const useMount = (fn, state=[]) => {
  useEffect(fn, state)
}

/**
 * Define hook
 */

export default useMount
