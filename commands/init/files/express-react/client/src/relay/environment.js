'use strict'

/**
 * Dependencies
 */

const relay_runtime = 'relay-runtime'

/**
 * Constants
 */

const Environment = relay_runtime.Environment
const Network = relay_runtime.Network
const RecordSource = relay_runtime.RecordSource
const Store = relay_runtime.Store

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

module.exports = environment
