import { createActions } from 'redux-actions'

export const {
  getTeachersRequest,
  getTeachersSuccess,
  getTeachersFailure,
  getTeacherRequest,
  getTeacherSuccess,
  getTeacherFailure
} = createActions({
  GET_TEACHERS_REQUEST: undefined,
  GET_TEACHERS_SUCCESS: payload => payload,
  GET_TEACHERS_FAILURE: payload => payload,
  GET_TEACHER_REQUEST: undefined,
  GET_TEACHER_SUCCESS: payload => payload,
  GET_TEACHER_FAILURE: payload => payload
})
