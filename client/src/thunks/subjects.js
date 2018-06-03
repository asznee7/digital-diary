import {
  getSubjectsRequest,
  getSubjectsSuccess,
  getSubjectsFailure,
  getSubjectRequest,
  getSubjectSuccess,
  getSubjectFailure
} from '../actions/subjects'
import subjects from '../api/subjects'
import { error } from 'react-notification-system-redux'
import { notificationOptionsError } from '../utils/notifications'

const getSubjects = () => dispatch => {
  dispatch(getSubjectsRequest())
  subjects.getSubjects()
    .then(response => dispatch(getSubjectsSuccess(response.data)))
    .catch(e => {
      dispatch(getSubjectsFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

const getSubject = (id) => dispatch => {
  dispatch(getSubjectRequest())
  subjects.getSubject(id)
    .then(response => dispatch(getSubjectSuccess(response.data)))
    .catch(e => {
      dispatch(getSubjectFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

export default {
  getSubjects,
  getSubject
}
