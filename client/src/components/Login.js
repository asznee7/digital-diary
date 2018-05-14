import React, { Component } from 'react';
import styles from './Login.css'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import PropTypes from 'prop-types'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayErrors: false
    }
  }

  onLoginClick = (e) => {
    e.preventDefault()
    if (!e.target.checkValidity()) {
      this.setState({ displayErrors: true })
      return;
    }
    const data = formDataToObject(new FormData(e.target))
    console.log(data)
    this.props.login(data)
  }

  render() {
    const { displayErrors } = this.state;
    return (
      <div>
        <h3 className={styles.header}>Sign in to Digital Diary</h3>
        <form onSubmit={(e) => this.onLoginClick(e)}
              className={displayErrors ? styles.displayErrors : ''}
              noValidate>
          <label>Username</label>
          <input type='text'
                 name='login'
                 required/>
          <label>Password</label>
          <input type='password'
                 name='password'
                 required/>
          <input className='button-primary submit'
                 type='submit'
                 value='Sign in'/>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired
}

function formDataToObject(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);

  }
  return data
}

const mapStateToProps = state => ({
  loggedUser: state.authReducer.loggedUser
})

export default connect(mapStateToProps, { login })(Login);
