import { getMeRequest, getMeSuccess, getMeFailure } from '../actions/users'
import teachers from './teachers'
import students from './students'
import users from '../api/users'
import { redirect } from 'redux-first-router'
import { error } from 'react-notification-system-redux'
import { notificationOptionsError } from '../utils/notifications'

const getMe = () => dispatch => {
  dispatch(getMeRequest())
  users.getMe()
    .then(response => {
      dispatch(getMeSuccess(response.data))
      const { id, role } = response.data
      switch (role) {
        case 'teacher':
          dispatch(teachers.getTeacher(id))
          break
        case 'student':
          dispatch(students.getStudent(id))
          break
        default:
      }
    })
    .catch(e => {
      dispatch(getMeFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
      dispatch(redirect({ type: 'LOGIN' }))
    })
}

export default {
  getMe
}
