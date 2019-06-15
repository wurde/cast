/**
 * Dependencies
 */

import { graphql, commitMutation } from 'react-relay'

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
 * Export mutation
 */

export default CreateContentMutation
