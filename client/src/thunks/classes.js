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

const getClasses = classesIds => dispatch => {
  dispatch(getClassesRequest())
  classes.getClasses()
    .then(response => dispatch(getClassesSuccess(response.data, classesIds)))
    .catch(e => dispatch(getClassesFailure(e)))
}

const getClass = id => dispatch => {
  dispatch(getClassRequest())
  classes.getClass(id)
    .then(response => dispatch(getClassSuccess(response.data)))
    .catch(e => {
      dispatch(getClassFailure(e))
      if (e.response.status === 404)
        dispatch(routesActions.goToNotFound())
    })
}

export default {
  getClasses,
  getClass
}
