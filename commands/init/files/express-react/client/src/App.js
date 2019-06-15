/**
 * Dependencies
 */

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RootRouter, UsersRouter } from './routes/index'

/**
 * Import component styles
 */

import './App.scss'

/**
 * Define component
 */

function App() {
  return (
    <BrowserRouter>
      <RootRouter mount="/" />
      <UsersRouter mount="/users" />
    </BrowserRouter>
  )
}

/**
 * Export component
 */

export default App
