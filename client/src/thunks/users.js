import { getMeRequest, getMeSuccess, getMeFailure } from '../actions/users'
import users from '../api/users'
import { redirect } from 'redux-first-router'

const getMe = () => dispatch => {
  dispatch(getMeRequest())
  users.getMe()
    .then((response) => {
      dispatch(getMeSuccess(response.data))
    })
    .catch((e) => {
      dispatch(getMeFailure(e))
      //todo handle 401 error
      dispatch(redirect({ type: 'LOGIN' }))
    })
}

export default {
  getMe
}
