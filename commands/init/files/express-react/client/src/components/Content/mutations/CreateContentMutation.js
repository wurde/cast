'use strict'

/**
 * Dependencies
 */

const react_relay = require('react-relay')

/**
 * Constants
 */

const graphql = react_relay.graphql
const commitMutation = react_relay.commitMutation

/**
 * Define the mutation
 */

const mutation = graphql`
  mutation CreateLinkMutation($input: CreateLinkInput!) {
    createLink(input: $input) {
      link {
        id
        createdAt
        url
        description
      }
    }
  }
`

/**
 * Define function
 */

function createContent() {
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (res, errors) => {
      console.log("Response from server.")
    },
    onError:
  })
}

/**
 * Export query component
 */

module.exports = CreateContentMutation
