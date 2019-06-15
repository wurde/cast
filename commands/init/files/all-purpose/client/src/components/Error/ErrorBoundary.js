/**
 * Dependencies
 */

import React, { Component } from 'react'
import { ErrorBoundaryStyle } from './styles/index'

/**
 * Define component
 */

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorBoundaryStyle>
          <h1>Error {this.props.status}</h1>
          <p>Sorry for the inconvenience!</p>
        </ErrorBoundaryStyle>
      )
    }

    return this.props.children
  }
}

/**
 * Export component
 */

export default ErrorBoundary
