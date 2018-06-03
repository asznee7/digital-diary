import { combineReducers } from 'redux'
import { connectRoutes } from 'redux-first-router'
import { reducer as formReducer } from 'redux-form'
import { reducer as notifications } from 'react-notification-system-redux';
import createHistory from 'history/createBrowserHistory'
import routesMap from '../routesMap'
import page from './page'
import me from './me'
import { classes, oneClass } from './classes'
import { students, student } from './students'
import { marks, mark, postMark, putMark } from './marks'
import { teachers, teacher } from './teachers'
import { subjects, subject } from './subjects'

const history = createHistory()

export const { reducer, middleware, enhancer } = connectRoutes(history, routesMap)

const appReducer = combineReducers({
  form: formReducer,
  location: reducer,
  page,
  me,
  classes,
  class: oneClass,
  students,
  student,
  marks,
  mark,
  lastSentMark: postMark,
  lastUpdatedMark: putMark,
  teachers,
  teacher,
  subjects,
  subject,
  notifications
})

const rootReducer = (state, action) => {
  if(action.type === 'LOGOUT_SUCCESS'){
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
