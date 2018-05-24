import { createActions } from 'redux-actions'

export const {
  loginSuccess,
  loginFailure,
  logoutSuccess
} = createActions({
  LOGIN_SUCCESS: payload => payload,
  LOGIN_FAILURE: payload => payload,
  LOGOUT_SUCCESS: undefined
})
