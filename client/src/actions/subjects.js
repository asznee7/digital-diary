import { createActions } from 'redux-actions'

export const {
  getSubjectsRequest,
  getSubjectsSuccess,
  getSubjectsFailure,
  getSubjectRequest,
  getSubjectSuccess,
  getSubjectFailure
} = createActions({
  GET_SUBJECTS_REQUEST: undefined,
  GET_SUBJECTS_SUCCESS: payload => payload,
  GET_SUBJECTS_FAILURE: payload => payload,
  GET_SUBJECT_REQUEST: undefined,
  GET_SUBJECT_SUCCESS: payload => payload,
  GET_SUBJECT_FAILURE: payload => payload
})
