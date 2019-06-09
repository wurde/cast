'use strict'

/**
 * Dependencies
 */

const React = require('react')
const components = require('./components/index')

/**
 * Import component styles
 */

require('./App.scss')

/**
 * Define component
 */

function App() {
  return (
    <div className="jsx-App">
      <components.Title text="Leaflet Map" />
      <components.Map />
    </div>
  )
}

/**
 * Export component
 */

module.exports = App
