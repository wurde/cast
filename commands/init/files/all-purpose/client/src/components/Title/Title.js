/**
 * Dependencies
 */

import React from 'react'
import { TitleStyle } from './styles/index'

/**
 * Define component
 */

function Title(props) {
  return (
    <TitleStyle>
      <h1>{props.text}</h1>
    </TitleStyle>
  )
}

/**
 * Export component
 */

export default Title
