import { NOT_FOUND } from 'redux-first-router'
import { routes } from '../constants/index'

const initialState = 'Main'

const {
  FORBIDDEN,
  ROUTE_LOGIN,
  ROUTE_MAIN,
  ROUTE_CLASSES,
  ROUTE_CLASS
} = routes

const components = {
  [ROUTE_CLASS]: 'Class',
  [ROUTE_CLASSES]: 'Classes',
  [ROUTE_LOGIN]: 'Login',
  [ROUTE_MAIN]: 'Main',
  [NOT_FOUND]: 'NotFound',
  [FORBIDDEN]: 'Forbidden'
}

export default (state = initialState, action) => components[action.type] || state
