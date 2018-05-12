import './login.css'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login } from '../actions/authActions'

class Login extends Component {
  render() {
    return (
      <div>
        <section className='header'>
          <h3>Sign in to Digital Diary</h3>
        </section>
        <section>
          <form>
            <label>Username</label>
            <input type='text'/>
            <label>Password</label>
            <input type='password'/>
            <input className='button-primary submit' type='submit' value='Sign in'/>
          </form>
        </section>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
