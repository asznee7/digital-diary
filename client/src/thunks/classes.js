import {
  getClassesRequest,
  getClassesSuccess,
  getClassesFailure,
  getClassRequest,
  getClassSuccess,
  getClassFailure
} from '../actions/classes'
import classes from '../api/classes'
import routesActions from '../actions/routes'
import { error } from 'react-notification-system-redux'
import { notificationOptionsError } from '../utils/notifications'

const getClasses = classesIds => dispatch => {
  dispatch(getClassesRequest())
  classes.getClasses()
    .then(response => dispatch(getClassesSuccess(response.data, classesIds)))
    .catch(e => {
      dispatch(getClassesFailure(e))
      if (e.response)
        dispatch(error(notificationOptionsError(e.response.data.message)))
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

const getClass = id => dispatch => {
  dispatch(getClassRequest())
  classes.getClass(id)
    .then(response => dispatch(getClassSuccess(response.data)))
    .catch(e => {
      dispatch(getClassFailure(e))
      if (e.response){
        if (e.response.status === 404)
          dispatch(routesActions.goToNotFound())
        else
          dispatch(error(notificationOptionsError(e.response.data.message)))
      }
      else
        dispatch(error(notificationOptionsError(e.message)))
    })
}

export default {
  getClasses,
  getClass
}
