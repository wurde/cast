/**
 * Dependencies
 */

import axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { SigninStyle } from './styles/index'

/**
 * Define component
 */

class Signin extends Component {
  state = {
    username: '',
    password: ''
  }

  handleOnSubmit = (event) => {
    event.preventDefault()

    axios.post('http://localhost:8080/login', this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/home')
      })
      .catch(error => {
        console.error(error)
      })
  }

  handleOnChange = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <SigninStyle>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-md-8 col-lg-5" style={{ marginTop: '80px' }}>
              <h3>Sign In</h3>

              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <label htmlFor="input-username">Username</label>
                  <input id="input-username" type="text" required name="username" value={this.state.username} onChange={this.handleOnChange} className="form-control" autoFocus={true} />
                </div>

                <div className="form-group">
                  <label htmlFor="input-password">Password</label>
                  <input id="input-password" type="password" required name="password" value={this.state.password} onChange={this.handleOnChange} className="form-control" />
                </div>

                <button type="submit" className="btn btn-block btn-primary">
                  Continue
                </button>
              </form>

              <br/>

              <p>I don't have an account: <NavLink to="/signup">Sign up</NavLink></p>
            </div>
          </div>
        </div>
      </SigninStyle>
    )
  }
}

/**
 * Export component
 */

export default Signin
