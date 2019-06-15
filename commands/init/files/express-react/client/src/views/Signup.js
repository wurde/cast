/**
 * Dependencies
 */

import axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { SignupStyle } from './styles/index'

/**
 * Define component
 */

class Signup extends Component {
  state = {
    username: '',
    password: ''
  }

  handleOnSubmit = (event) => {
    event.preventDefault()

    axios.post('http://localhost:8080/register', this.state)
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
      <SignupStyle>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-md-8 col-lg-5" style={{ marginTop: '80px' }}>
              <h3>Sign Up</h3>

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

              <p>I already have an account: <NavLink to="/signin">Sign in</NavLink></p>

            </div>
          </div>
        </div>
      </SignupStyle>
    )
  }
}

/**
 * Export component
 */

export default Signup
