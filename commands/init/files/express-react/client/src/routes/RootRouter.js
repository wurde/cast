/**
 * Dependencies
 */

import React, { Suspense, lazy } from 'react'
import { Route, Redirect } from 'react-router-dom'

/**
 * Lazy load dependencies
 */

const { Landing, Home } = lazy(() => require('../views/index'))

/**
 * Define component
 */

function RootRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/about" render={() => <Redirect to="/" />} />
    </Suspense>
  )
}

/**
 * Export component
 */

export default RootRouter
