'use strict'

/**
 * Dependencies
 */

const React = require('react')

/**
 * Define component
 */

function HomePage() {
  return (
    <div>
      <components.Title text="Todo List: MVP" />
      <components.LazyContent />
    </div>
  )
}

/**
 * Export component
 */

module.exports = HomePage
