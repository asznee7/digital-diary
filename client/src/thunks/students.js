import {
  getStudentsRequest,
  getStudentsSuccess,
  getStudentsFailure,
  getStudentRequest,
  getStudentSuccess,
  getStudentFailure
} from '../actions/students'
import students from '../api/students'
import { error } from 'react-notification-system-redux'
import { notificationOptionsError } from '../utils/notifications'

const getStudents = () => dispatch => {
  dispatch(getStudentsRequest())
  students.getStudents()
    .then(response => dispatch(getStudentsSuccess(response.data)))
    .catch(e => {
      dispatch(getStudentsFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

const getStudent = (id) => dispatch => {
  dispatch(getStudentRequest())
  students.getStudent(id)
    .then(response => dispatch(getStudentSuccess(response.data)))
    .catch(e => {
      dispatch(getStudentFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

export default {
  getStudents,
  getStudent
}
