import { createAction } from 'redux-actions'
import { NOT_FOUND } from 'redux-first-router'

import { routes } from '../constants'

export default {
  goToForbidden: createAction(routes.FORBIDDEN),
  goToLogin: createAction(routes.LOGIN),
  goToMain: createAction(routes.MAIN),
  goToClasses: createAction(routes.CLASSES),
  goToClass: createAction(routes.CLASS, id => ({ id })),
  goToNotFound: createAction(NOT_FOUND),
  goToStudentClass: createAction(routes.STUDENT_CLASS),
  goToStudentMarks: createAction(routes.STUDENT_MARKS)
}
