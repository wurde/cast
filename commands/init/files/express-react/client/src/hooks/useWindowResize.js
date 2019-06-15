/**
 * Dependencies
 */

import React, { useState, useEffect } from 'react'

/**
 * Define hook
 */

const useWindowResize = () => {
  const resizer = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const [size, setSize] = useState(resizer)

  useEffect(() => {
    const handleResize = () => {
      setSize(resizer())
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

/**
 * Define hook
 */

export default useWindowResize
