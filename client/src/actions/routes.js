import { createAction } from 'redux-actions'
import { NOT_FOUND } from 'redux-first-router'

import { routes } from '../constants'

export default {
  goToForbidden: createAction(routes.FORBIDDEN),
  goToLogin: createAction(routes.ROUTE_LOGIN),
  goToMain: createAction(routes.ROUTE_MAIN),
  goToClasses: createAction(routes.ROUTE_CLASSES),
  goToClass: createAction(routes.ROUTE_CLASS, id => ({ id })),
  goToNotFound: createAction(NOT_FOUND)
}
