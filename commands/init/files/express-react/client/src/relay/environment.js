/**
 * Dependencies
 */

import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime'

/**
 * Define fetch query
 */

function fetch_query(operation, variables) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

/**
 * Define environment
 */

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})

/**
 * Export environment
 */

export default environment
