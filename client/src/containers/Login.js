import * as React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import security from '../thunks/security'
import { renderField } from '../utils/common'
import styles from './Login.css'
import { XIcon } from 'react-octicons'

const mapDispatchToProps = (dispatch) => ({
  login: (credentials, resolve, reject) => dispatch(security.login(credentials, resolve, reject))
})

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showError: true
    }
    console.log(this.props)
  }

  submit = (values) => {
    const errors = {}

    if (!values.login) {
      errors.login = 'Field required'
    }
    if (!values.password) {
      errors.password = 'Field required'
    }

    if (!isEmpty(errors)) {
      throw new SubmissionError(errors)
    }

    this.setState({
      showError: true
    })

    return new Promise((resolve, reject) => {
      this.props.login(values, resolve, reject)
    })
  }

  removeErrorMessage = () => {
    this.setState({
      showError: false
    })
  }

  render () {
    const { handleSubmit, submitting, error } = this.props
    return (
      <div>
        <h3 className={styles.header}>Sign in to Digital Diary</h3>
        {this.state.showError && error &&
          <div className={styles.errorMessage} ref={this.errorMessage}>
            {error}
            <XIcon onClick={this.removeErrorMessage} className={styles.icon}/>
          </div>
        }
        <form onSubmit={handleSubmit(this.submit)}
              noValidate>
          <Field name='login'
                 type='text'
                 component={renderField}
                 label='Username'
                 disabled={submitting} />
          <Field name='password'
                 type='password'
                 component={renderField}
                 label='Password'
                 disabled={submitting} />
          <input className='button button-primary submit'
                 type='submit'
                 value='Sign In'
                 disabled={submitting}/>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default reduxForm({ form: 'login' })(connect(null, mapDispatchToProps)(Login))
