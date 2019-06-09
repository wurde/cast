'use strict'

/**
 * Dependencies
 */

const React = require('react')
const styles = require('./styles/index')
const Error = require('../Error/ErrorBoundary')
const LoadingContent = require('./LoadingContent')

/**
 * Constants
 */

const Suspense = React.Suspense
const lazy = React.lazy

/**
 * Lazy dependencies
 */

const Content = lazy(() => require('./Content'))

/**
 * Define component
 */

function LazyContent(props) {
  return (
    <ErrorBoundary status='500'>
      <Suspense fallback={<LoadingContent />}>
        <Content />
      </Suspense>
    </ErrorBoundary>
  )
}

/**
 * Export component
 */

module.exports = LazyContent
