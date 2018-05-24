import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer, { middleware, enhancer } from './reducers'

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    enhancer,
    applyMiddleware(thunk, middleware, logger)
  )
)

export default store
