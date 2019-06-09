'use strict'

/**
 * Dependencies
 */

const React = require('react')
const react_router_dom = require('react-router-dom')
const components = require('./components/index')

/**
 * Constants
 */

const lazy = React.lazy
const Suspense = React.Suspense
const Route = react_router_dom.Route
const Redirect = react_router_dom.Redirect
const LandingPage = components.LandingPage
const HomePage = components.HomePage

/**
 * Lazy load dependencies
 */

const components = lazy(() => require('../components/index'))

/**
 * Define component
 */

function RootRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/about" render={() => <Redirect to="/" />} />
    </Suspense>
  )
}

/**
 * Export component
 */

module.exports = RootRouter
