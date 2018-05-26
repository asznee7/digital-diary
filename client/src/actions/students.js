import { createActions } from 'redux-actions'

export const {
  getStudentsRequest,
  getStudentsSuccess,
  getStudentsFailure,
  getStudentRequest,
  getStudentSuccess,
  getStudentFailure
} = createActions({
  GET_STUDENTS_REQUEST: undefined,
  GET_STUDENTS_SUCCESS: payload => payload,
  GET_STUDENTS_FAILURE: payload => payload,
  GET_STUDENT_REQUEST: undefined,
  GET_STUDENT_SUCCESS: payload => payload,
  GET_STUDENT_FAILURE: payload => payload
})
