/**
 * Dependencies
 */

import React, { useState } from 'react'
import { ContentFormStyle } from './styles/index'
import { CreateContentMutation } from './mutations/index'

/**
 * Define component
 */

function Content(props) {
  const { description, setDescription } = useState('')

  function handleOnSubmit(event) {
    event.preventDefault()
    CreateContentMutation(description)
  }

  return (
    <ContentFormStyle>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
        <button type="submit">Submit</button>
      </form>
    </ContentFormStyle>
  )
}

/**
 * Export component
 */

export default Content
