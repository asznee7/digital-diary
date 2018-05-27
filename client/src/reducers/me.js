import { handleActions } from 'redux-actions'
import { security, users } from '../constants'

const initialState = {
  data: null,
  isFetching: false,
  error: false
}

const meReducer = handleActions({
  [security.LOGIN_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [security.LOGOUT_SUCCESS]: (state, action) => Object.assign({}, state, { data: null }),
  [users.GET_ME_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [users.GET_ME_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [users.GET_ME_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false, error: true })
}, initialState)

export default meReducer
