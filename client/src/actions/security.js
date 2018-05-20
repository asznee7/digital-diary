import { createActions } from 'redux-actions'

export const {
  loginSuccess,
  loginFailure
} = createActions({
  LOGIN_SUCCESS: payload => payload,
  LOGIN_FAILURE: payload => payload
})
