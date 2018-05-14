import { applyMiddleware, createStore, compose } from 'redux'
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
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

export default store
