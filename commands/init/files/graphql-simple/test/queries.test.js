'use strict'

/**
 * Dependencies
 */

const assert = require('assert')
const axios = require('axios')
const app = require('../server/app')

/**
 * Constants
 */

const port = 8882
const url = `http://localhost:${port}`
const axios_client = axios.create({ baseURL: url })

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
  server.close()
})

/**
 * Assertions
 */

test(`\n
  { hello }
`, async () => {
  let res = await axios_client({
    method: 'POST',
    data: {
      query: '{ hello }'
    }
  })

  assert.equal(res.status, 200)
  assert.equal(res.statusText, 'OK')
  assert.equal(res.data.data.hello, 'Hello, world!')
})

test('Must provide query string', async () => {
  try {
    await axios_client({ method: 'POST' })
  } catch(err) {
    assert.equal(err.response.status, 400)
    assert.equal(err.response.statusText, 'Bad Request')

    let error_messages = err.response.data.errors.map(e => e.message)
    assert.ok(error_messages.includes('Must provide query string.'))
  }
})
