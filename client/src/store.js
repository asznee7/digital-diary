import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'

const initialState = {}
const middleware = [thunk]

const store = createStore(
  combineReducers({
    authReducer
  }),
  initialState,
  applyMiddleware(...middleware))

export default store