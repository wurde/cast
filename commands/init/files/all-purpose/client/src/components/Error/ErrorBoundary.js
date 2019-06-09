'use strict'

/**
 * Dependencies
 */

const React = require('react')
const styles = require('./styles/index')

/**
 * Constants
 */

const Component = React.Component

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
        <styles.ErrorBoundaryStyle>
          <h1>Error {this.props.status}</h1>
          <p>Sorry for the inconvenience!</p>
        </styles.ErrorBoundaryStyle>
      )
    }

    return this.props.children
  }
}

/**
 * Export component
 */

module.exports = ErrorBoundary
