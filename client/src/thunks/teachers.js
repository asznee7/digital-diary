import {
  getTeachersRequest,
  getTeachersSuccess,
  getTeachersFailure,
  getTeacherRequest,
  getTeacherSuccess,
  getTeacherFailure
} from '../actions/teachers'
import teachers from '../api/teachers'
import { error } from 'react-notification-system-redux'
import { notificationOptionsError } from '../utils/notifications'

const getTeachers = () => dispatch => {
  dispatch(getTeachersRequest())
  teachers.getTeachers()
    .then(response => dispatch(getTeachersSuccess(response.data)))
    .catch(e => {
      dispatch(getTeachersFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

const getTeacher = (id) => dispatch => {
  dispatch(getTeacherRequest())
  teachers.getTeacher(id)
    .then(response => dispatch(getTeacherSuccess(response.data)))
    .catch(e => {
      dispatch(getTeacherFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

export default {
  getTeachers,
  getTeacher
}
