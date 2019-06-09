'use strict'

/**
 * Dependencies
 */

const React = require('react')
const routes = require('./routes/index')
const react_router_dom = require('react-router-dom')

/**
 * Constants
 */

const BrowserRouter = react_router_dom.BrowserRouter

/**
 * Import component styles
 */

require('./App.scss')

/**
 * Define component
 */

function App() {
  return (
    <BrowserRouter>
      <routes.RootRouter mount="/" />
      <routes.UsersRouter mount="/users" />
    </BrowserRouter>
  )
}

/**
 * Export component
 */

module.exports = App
