'use strict'

/**
 * Dependencies
 */

const React = require('react')
const styles = require('./styles/index')
const mutations = require('./mutations/index')

/**
 * Constants
 */

const useState = React.useState

/**
 * Define component
 */

function Content(props) {
  const { description, setDescription } = useState('')

  function handleOnSubmit(event) {
    event.preventDefault()
    mutations.CreateContentMutation(description)
  }

  return (
    <styles.ContentFormStyle>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
        <button type="submit">Submit</button>
      </form>
    </styles.ContentFormStyle>
  )
}

/**
 * Export component
 */

module.exports = Content
