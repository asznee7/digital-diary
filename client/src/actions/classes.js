import { createActions } from 'redux-actions'

export const {
  getClassesRequest,
  getClassesSuccess,
  getClassesFailure
} = createActions({
  GET_CLASSES_REQUEST: undefined,
  GET_CLASSES_SUCCESS: payload => payload,
  GET_CLASSES_FAILURE: payload => payload
})
