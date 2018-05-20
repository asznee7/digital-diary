import { handleActions } from 'redux-actions'
import { security, users } from '../constants'

const initialState = {
  data: null,
  isFetching: false
}

const meReducer = handleActions({
  [security.LOGIN_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [users.GET_ME_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false })
}, initialState)

export default meReducer
