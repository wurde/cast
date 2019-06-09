'use strict'

/**
 * Dependencies
 */

const React = require('react')
const react_router_dom = require('react-router-dom')

/**
 * Constants
 */

const lazy = React.lazy
const Suspense = React.Suspense
const Route = react_router_dom.Route
const Redirect = react_router_dom.Redirect
const SigninPage = components.SigninPage
const SignupPage = components.SignupPage

/**
 * Lazy load dependencies
 */

const components = lazy(() => require('../components/index'))

/**
 * Define component
 */

function UsersRouter({ mount }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Route path={`${mount}/signin`} component={SigninPage} />
      <Route path={`${mount}/signup`} component={SignupPage} />
    </Suspense>
  )
}

/**
 * Define component
 */

module.exports = UsersRouter
