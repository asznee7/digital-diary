import {
  getClassesRequest,
  getClassesSuccess,
  getClassesFailure,
  getClassRequest,
  getClassSuccess,
  getClassFailure
} from '../actions/classes'
import classes from '../api/classes'

const getClasses = () => dispatch => {
  dispatch(getClassesRequest())
  classes.getClasses()
    .then(response => dispatch(getClassesSuccess(response.data)))
    .catch((e) => dispatch(getClassesFailure(e)))
}

const getClass = (id) => dispatch => {
  dispatch(getClassRequest())
  classes.getClass(id)
    .then(response => dispatch(getClassSuccess(response.data)))
    .catch((e) => dispatch(getClassFailure(e)))
}

export default {
  getClasses,
  getClass
}
