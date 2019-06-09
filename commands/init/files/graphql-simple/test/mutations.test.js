'use strict'

/**
 * Dependencies
 */

const axios = require('axios')
const app = require('../server/app')

/**
 * Constants
 */

const port = 8881
const url = `http://localhost:${port}`

/**
 * Locals
 */

let server

/**
 * Setup
 */

 beforeAll(() => {
   server = app.listen(port)
 })

/**
 * Teardown
 */

afterAll(() => {
  console.log("afterAll", server)
  server.close()
})

/**
 * Assertions
 */

test.skip(`\n
  mutation {
    createMessage(input: {
      author: "andy",
      content: "hope is a good thing",
    }) {
      id
    }
  }
`, async t => {
  t.pass()
})
