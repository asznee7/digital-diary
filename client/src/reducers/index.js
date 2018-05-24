import { combineReducers } from 'redux'
import { connectRoutes } from 'redux-first-router'
import { reducer as formReducer } from 'redux-form'

import createHistory from 'history/createBrowserHistory'
import routesMap from '../routesMap'
import page from './page'
import me from './me'
import { classes, oneClass} from './classes'

const history = createHistory()

export const { reducer, middleware, enhancer } = connectRoutes(history, routesMap)

const rootReducer = combineReducers({
  form: formReducer,
  location: reducer,
  page,
  me,
  classes,
  class: oneClass
})

export default rootReducer
