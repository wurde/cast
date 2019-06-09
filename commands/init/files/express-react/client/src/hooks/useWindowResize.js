'use strict'

/**
 * Dependencies
 */

const React = require('react')

/**
 * Constants
 */

const useState = React.useState
const useEffect = React.useEffect

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

module.exports = useWindowResize
