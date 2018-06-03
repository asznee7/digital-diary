import { loginSuccess, logoutSuccess } from '../actions/security'
import routes from '../actions/routes'
import security from '../api/security'
import { SubmissionError } from 'redux-form'
import users from './users'
import { notificationOptionsError } from '../utils/notifications'
import { getStudentFailure } from '../actions/students'
import { error } from 'react-notification-system-redux'

const login = (credentials, resolve, reject) =>
  dispatch => {
    security.login(credentials)
      .then((response) => {
        dispatch(loginSuccess(response.data))
        dispatch(users.getMe())
        dispatch(routes.goToMain())
      })
      .catch((error) =>
        reject(new SubmissionError({ _error: error.response ? error.response.data.message : error.message }))
      )
  }

const logout = () => dispatch =>
  security.logout()
    .then(() => {
      dispatch(logoutSuccess())
      dispatch(routes.goToLogin())
    })
    .catch(e => {
      dispatch(getStudentFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })

export default {
  login,
  logout
}
