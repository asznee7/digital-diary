import { createActions } from 'redux-actions'

export const {
  getClassesRequest,
  getClassesSuccess,
  getClassesFailure,
  getClassRequest,
  getClassSuccess,
  getClassFailure
} = createActions({
  GET_CLASSES_REQUEST: undefined,
  GET_CLASSES_SUCCESS: payload => payload,
  GET_CLASSES_FAILURE: payload => payload,
  GET_CLASS_REQUEST: undefined,
  GET_CLASS_SUCCESS: payload => payload,
  GET_CLASS_FAILURE: payload => payload
})
