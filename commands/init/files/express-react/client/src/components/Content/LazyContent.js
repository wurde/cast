'use strict'

/**
 * Dependencies
 */

import React, { Suspense, lazy } from 'react'
import styles from './styles/index'
import Error from '../Error/ErrorBoundary'
import LoadingContent from './LoadingContent'

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

export default LazyContent
