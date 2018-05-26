import { createActions } from 'redux-actions'

export const {
  getMarksRequest,
  getMarksSuccess,
  getMarksFailure,
  getMarkRequest,
  getMarkSuccess,
  getMarkFailure,
  postMarkRequest,
  postMarkSuccess,
  postMarkFailure,
  putMarkRequest,
  putMarkSuccess,
  putMarkFailure
} = createActions({
  GET_MARKS_REQUEST: undefined,
  GET_MARKS_SUCCESS: payload => payload,
  GET_MARKS_FAILURE: payload => payload,
  GET_MARK_REQUEST: undefined,
  GET_MARK_SUCCESS: payload => payload,
  GET_MARK_FAILURE: payload => payload,
  POST_MARK_REQUEST: undefined,
  POST_MARK_SUCCESS: payload => payload,
  POST_MARK_FAILURE: payload => payload,
  PUT_MARK_REQUEST: undefined,
  PUT_MARK_SUCCESS: payload => payload,
  PUT_MARK_FAILURE: payload => payload
})
