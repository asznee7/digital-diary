import { NOT_FOUND } from 'redux-first-router'
import { routes } from '../constants/index'

const initialState = 'Main'

const {
  FORBIDDEN,
  LOGIN,
  MAIN,
  CLASSES,
  CLASS,
  STUDENT_CLASS,
  STUDENT_MARKS
} = routes

const components = {
  [CLASS]: 'Class',
  [CLASSES]: 'Classes',
  [LOGIN]: 'Login',
  [MAIN]: 'Main',
  [NOT_FOUND]: 'NotFound',
  [FORBIDDEN]: 'Forbidden',
  [STUDENT_CLASS]: 'StudentClass',
  [STUDENT_MARKS]: 'StudentMarks'
}

export default (state = initialState, action) => components[action.type] || state
